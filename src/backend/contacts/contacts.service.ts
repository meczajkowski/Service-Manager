import { Contact, Customer, Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';

export const contacts = {
  create: async (contact: Prisma.ContactCreateInput) => {
    const newContact = await prisma.contact.create({
      data: contact,
    });
    return newContact;
  },
  get: async (id: Contact['id']) => {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });
    return contact;
  },
  getAll: async () => {
    const contacts = await prisma.contact.findMany();
    return contacts;
  },
  getAllForCustomer: async (customerId: Customer['id']) => {
    const contacts = await prisma.contact.findMany({
      where: {
        customers: {
          some: {
            id: customerId,
          },
        },
      },
    });
    return contacts;
  },
  update: async (id: Contact['id'], contact: Prisma.ContactUpdateInput) => {
    const updatedContact = await prisma.contact.update({
      where: { id },
      data: contact,
    });
    return updatedContact;
  },
  delete: async (id: Contact['id']) => {
    await prisma.contact.delete({
      where: { id },
    });
  },
};
