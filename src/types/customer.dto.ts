import { z } from 'zod';
import { ContactDto } from './contact.dto';
import { DeviceDto } from './device.dto';

export const customerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
});
export type CustomerSchema = z.infer<typeof customerSchema>;

// DTO for creating a customer
export type CreateCustomerDto = CustomerSchema;

// DTO for updating a customer
export type UpdateCustomerDto = CustomerSchema & {
  id: string;
};

// Basic customer response without relations
export type CustomerDto = CustomerSchema & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// Customer with all relations
export type CustomerWithRelationsDto = CustomerDto & {
  devices: DeviceDto[];
  contacts: ContactDto[];
};
