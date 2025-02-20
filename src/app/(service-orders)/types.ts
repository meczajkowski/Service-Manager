import { Customer, Device, ServiceOrder, User } from '@prisma/client';

export type ServiceOrderWithRelations = ServiceOrder & {
  device: Device & {
    customer: Customer | null;
  };
  assignedTo: User | null;
};
