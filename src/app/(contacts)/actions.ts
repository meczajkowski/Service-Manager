'use server';

import { contactsService } from '@/backend/domains/contacts/contacts.service';
import { executeAction } from '@/lib/actions';
import { routes } from '@/routes';
import { CreateContactDto, UpdateContactDto } from '@/types/contact.dto';

export const addContactAction = async (data: CreateContactDto) => {
  return executeAction({
    fn: () => contactsService.create(data),
    options: {
      errorMessage: 'Failed to create contact',
      revalidatePaths: [routes.contacts.list, routes.customers.list],
    },
  });
};

export const getContactsAction = async () => {
  return executeAction({
    fn: () => contactsService.getAll(),
    options: {
      errorMessage: 'Failed to get contacts',
    },
  });
};

export const getContactAction = async (id: string) => {
  return executeAction({
    fn: () => contactsService.get(id),
    options: {
      errorMessage: 'Failed to get contact',
    },
  });
};

export const updateContactAction = async (data: UpdateContactDto) => {
  return executeAction({
    fn: () => contactsService.update(data),
    options: {
      errorMessage: 'Failed to update contact',
      revalidatePaths: [routes.contacts.list, routes.customers.list],
    },
  });
};

export const deleteContactAction = async (id: string) => {
  return executeAction({
    fn: () => contactsService.delete(id),
    options: {
      errorMessage: 'Failed to delete contact',
      revalidatePaths: [routes.contacts.list, routes.customers.list],
    },
  });
};

export const getContactsForCustomerAction = async (customerId: string) => {
  return executeAction({
    fn: () => contactsService.getAllForCustomer(customerId),
    options: {
      errorMessage: 'Failed to get contacts for customer',
    },
  });
};
