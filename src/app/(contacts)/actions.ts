'use server';

import { contacts } from '@/backend/contacts/contacts.service';
import { routes } from '@/routes';
import { Contact, Customer } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { ContactSchema } from './schema';
import { ContactPayload } from './types';

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
  revalidatePath(routes.contacts.list);
  revalidatePath(routes.customers.list);
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
  contact: ContactPayload,
) => {
  const updatedContact = await contacts.update(id, contact);
  revalidatePath(routes.contacts.list);
  revalidatePath(routes.customers.list);
  return updatedContact;
};

export const deleteContactAction = async (id: Contact['id']) => {
  const deletedContact = await contacts.delete(id);
  revalidatePath(routes.contacts.list);
  revalidatePath(routes.customers.list);
  return deletedContact;
};

export const getContactsForCustomerAction = async (
  customerId: Customer['id'],
) => {
  return await contacts.getAllForCustomer(customerId);
};
