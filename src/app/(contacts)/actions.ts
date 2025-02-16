'use server';

import { AppRoutes } from '@/routes';
import { contacts } from '@/services/contacts.service';
import { Contact, Customer } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { ContactSchema } from './schema';

export const addContactAction = async (data: ContactSchema) => {
  const newContact = await contacts.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    ...(data.customers?.length
      ? {
          customers: {
            connect: data.customers.map((customer) => ({ id: customer.id })),
          },
        }
      : {}),
  });
  revalidatePath(AppRoutes.customers);
  return newContact;
};

export const getContactsAction = async () => {
  return await contacts.getAll();
};

export const getContactAction = async (id: Contact['id']) => {
  return await contacts.get(id);
};

export const updateContactAction = async (
  id: Contact['id'],
  contact: Contact,
) => {
  const updatedContact = await contacts.update(id, contact);
  revalidatePath(AppRoutes.customers);
  return updatedContact;
};

export const deleteContactAction = async (id: Contact['id']) => {
  const deletedContact = await contacts.delete(id);
  revalidatePath(AppRoutes.customers);
  return deletedContact;
};

export const getContactsForCustomerAction = async (
  customerId: Customer['id'],
) => {
  return await contacts.getAllForCustomer(customerId);
};
