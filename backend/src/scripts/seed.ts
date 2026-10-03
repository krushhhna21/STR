import { studyCategories } from '../../../frontend/src/data/studyData';
import { prisma } from '../utils/prisma';

async function seed() {
  console.log('Seeding categories and content...');
  for (const cat of studyCategories) {
    await prisma.category.create({
      data: {
        id: cat.id,
        name: cat.name,
        description: cat.desc,
        icon: cat.iconName,
        color: cat.color,
        bg: cat.bg,
      }
    });
    console.log(`Created category: ${cat.name}`);

    for (const stream of cat.streams) {
      await prisma.stream.create({
        data: {
          id: stream.id,
          name: stream.name,
          categoryId: cat.id,
        }
      });
      console.log(`  Created stream: ${stream.name}`);
      
      for (const subject of stream.subjects) {
        for (const chapter of subject.chapters) {
          for (const material of chapter.materials) {
            await prisma.contentItem.create({
              data: {
                id: `${material.id}-${stream.id}`,
                category: cat.id,
                stream: stream.id,
                year: subject.name,
                subject: chapter.name,
                type: material.type === 'notes' ? 'pdf' : 'video',
                title: material.name,
                linkOrFile: material.url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                meta: JSON.stringify({ duration: material.duration, pages: material.pages })
              }
            });
          }
        }
      }
    }
  }
  console.log('Done!');
  await prisma.$disconnect();
}
seed().catch(console.error);
