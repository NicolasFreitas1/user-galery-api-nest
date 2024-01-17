import { PrismaClient } from '@prisma/client';

import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function deleteEvery() {
  await prisma.user.deleteMany();
  await prisma.image.deleteMany();
}

async function createUserAdmin() {
  await prisma.user.create({
    data: {
      login: 'AGPR5',
      name: 'Admin AGPR5',
      password: await hash('Admin12345', 8),
    },
  });
}

async function main() {
  await deleteEvery();
  await createUserAdmin();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
