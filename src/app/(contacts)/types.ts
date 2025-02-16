import { Contact, Customer } from '@prisma/client';

export type ContactPayload = Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>;

export type ContactWithRelations = Contact & {
  customers: Customer[];
};
