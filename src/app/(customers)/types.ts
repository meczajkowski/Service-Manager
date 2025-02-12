import { Customer } from '@prisma/client';

export type CustomerPayload = Omit<
  Customer,
  'id' | 'createdAt' | 'updatedAt' | 'devices'
>;
