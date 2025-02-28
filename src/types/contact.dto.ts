import { z } from 'zod';
import { CustomerDto } from './customer.dto';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone is required'),
});
export type ContactSchema = z.infer<typeof contactSchema>;

// DTO for creating a contact
export type CreateContactDto = ContactSchema;

// DTO for updating a contact
export type UpdateContactDto = ContactSchema & {
  id: string;
};

// Basic contact response without relations
export type ContactDto = ContactSchema & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// Contact with all relations
export type ContactWithRelationsDto = ContactDto & {
  customers: CustomerDto[];
};
