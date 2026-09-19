import fs from 'fs';
import path from 'path';
import { prisma } from '../utils/prisma';

const devJsonPath = path.resolve(__dirname, '../../dev.json');

async function run() {
  if (!fs.existsSync(devJsonPath)) {
    console.log('No dev.json found at', devJsonPath);
    process.exit(0);
  }

  const raw = fs.readFileSync(devJsonPath, 'utf8');
  const dev = JSON.parse(raw);

  try {
    const users = dev.users || [];
    for (const u of users) {
      await prisma.user.upsert({
        where: { email: u.email },
        update: {},
        create: {
          id: u.id,
          name: u.name,
          email: u.email,
          passwordHash: u.passwordHash,
          role: u.role,
        }
      });
    }
    
    console.log(`Migrated ${users.length} users to Neon Postgres.`);
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

run();
