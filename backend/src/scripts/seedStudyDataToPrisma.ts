import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import ts from 'typescript';
import os from 'os';

// import studyCategories from frontend TS file via ts-node runtime
const studyDataPath = path.resolve(__dirname, '../../../frontend/src/data/studyData.ts');

async function importStudyData() {
  // read frontend TS and transpile to CommonJS, then require it
  const src = fs.readFileSync(studyDataPath, 'utf8');
  const transpiled = ts.transpileModule(src, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2019,
      esModuleInterop: true,
    },
  }).outputText;

  const tmpPath = path.join(os.tmpdir(), `studydata-${Date.now()}.js`);
  fs.writeFileSync(tmpPath, transpiled, 'utf8');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const studyModule = require(tmpPath) as any;
  // cleanup
  try {
    fs.unlinkSync(tmpPath);
  } catch (e) {
    /* ignore */
  }

  const { studyCategories } = studyModule;

  const prisma = new PrismaClient();

  try {
    for (const cat of studyCategories) {
      const category = await prisma.category.upsert({
        where: { id: cat.id },
        update: {
          name: cat.name,
          description: cat.desc || null,
          icon: cat.iconName || null,
          color: cat.color || null,
          bg: cat.bg || null,
        },
        create: {
          id: cat.id,
          name: cat.name,
          description: cat.desc || null,
          icon: cat.iconName || null,
          color: cat.color || null,
          bg: cat.bg || null,
        },
      });

      for (const stream of cat.streams || []) {
        const s = await prisma.stream.upsert({
          where: { id: stream.id },
          update: {
            name: stream.name,
            icon: null,
            categoryId: category.id,
          },
          create: {
            id: stream.id,
            name: stream.name,
            icon: null,
            categoryId: category.id,
          },
        });

        for (const subj of stream.subjects || []) {
          const subject = await prisma.subject.upsert({
            where: { id: subj.id },
            update: {
              name: subj.name,
              progress: typeof subj.progress === 'number' ? subj.progress : 0,
              streamId: s.id,
            },
            create: {
              id: subj.id,
              name: subj.name,
              progress: typeof subj.progress === 'number' ? subj.progress : 0,
              streamId: s.id,
            },
          });

          for (const ch of subj.chapters || []) {
            const chapter = await prisma.chapter.upsert({
              where: { id: ch.id },
              update: {
                name: ch.name,
                order: 0,
                subjectId: subject.id,
              },
              create: {
                id: ch.id,
                name: ch.name,
                order: 0,
                subjectId: subject.id,
              },
            });

            for (const mat of ch.materials || []) {
              await prisma.material.upsert({
                where: { id: mat.id },
                update: {
                  name: mat.name,
                  type: mat.type,
                  url: mat.url || null,
                  duration: mat.duration || null,
                  pages: mat.pages || null,
                  chapterId: chapter.id,
                },
                create: {
                  id: mat.id,
                  name: mat.name,
                  type: mat.type,
                  url: mat.url || null,
                  duration: mat.duration || null,
                  pages: mat.pages || null,
                  chapterId: chapter.id,
                },
              });
            }
          }
        }
      }
    }

    console.log('Seeding complete');
  } catch (err) {
    console.error('Seeding failed', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

importStudyData();
