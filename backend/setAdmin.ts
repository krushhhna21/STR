import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const user = await prisma.user.update({
      where: { email: 'krishnachalwad21@gmail.com' },
      data: { role: 'admin' }
    });
    console.log("Successfully updated user to admin:", user.email, user.role);
  } catch (err: any) {
    if (err.code === 'P2025') {
      console.log("User not found in database. Make sure you have signed up with this email first!");
    } else {
      console.error("Error updating user:", err.message);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
