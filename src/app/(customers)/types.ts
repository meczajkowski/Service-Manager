import { Contact, Customer, Device } from '@prisma/client';

export type CustomerPayload = Omit<
  Customer,
  'id' | 'createdAt' | 'updatedAt' | 'devices'
>;

export type CustomerWithRelations = Customer & {
  devices: Device[];
  contacts: Contact[];
};
