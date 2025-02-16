import { z } from 'zod';
import { customerWithIdSchema } from '../(customers)/schema';

export const contactSchema = z.object({
  name: z.string().min(1, {
    message: 'Name must be at least 1 character.',
  }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  phone: z.string().min(9, {
    message: 'Phone number must be at least 9 characters.',
  }),
  customers: z.array(customerWithIdSchema).optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
