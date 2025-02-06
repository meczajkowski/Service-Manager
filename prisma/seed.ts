import { DeviceModel, PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@konica.com' },
    update: {},
    create: {
      email: 'admin@konica.com',
      name: 'admin',
      password: 'admin',
      role: Role.ADMIN,
    },
  });

  const technician = await prisma.user.upsert({
    where: { email: 'technician@konica.com' },
    update: {},
    create: {
      email: 'technician@konica.com',
      name: 'technician',
      password: 'technician',
      role: Role.TECHNICIAN,
    },
  });

  const device = await prisma.device.upsert({
    where: { serialNumber: '1234567890' },
    update: {},
    create: {
      model: DeviceModel.C224,
      serialNumber: '1234567890',
    },
  });

  console.log('Database seeded successfully!');

  console.log('admin', admin);
  console.log('technician', technician);
  console.log('device', device);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
