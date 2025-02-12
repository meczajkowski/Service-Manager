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

  const customer = await prisma.customer.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Konica Minolta',
      address: '123 Main St, Anytown, USA',
      email: 'info@konica.com',
      phone: '123-456-7890',
    },
  });

  const contact = await prisma.contact.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@konica.com',
      phone: '123-456-7890',
      customers: {
        connect: { id: '1' },
      },
    },
  });

  const device = await prisma.device.upsert({
    where: { serialNumber: '1234567890' },
    update: {},
    create: {
      model: DeviceModel.C224,
      serialNumber: '1234567890',
      Customer: {
        connect: { id: '1' },
      },
    },
  });

  console.log('Database seeded successfully!');

  console.log('admin', admin);
  console.log('technician', technician);
  console.log('customer', customer);
  console.log('contact', contact);
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
