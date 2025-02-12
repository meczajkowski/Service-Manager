import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),

  email: z.string().email({
    message: 'Invalid email address.',
  }),
  phone: z.string().min(9, {
    message: 'Phone number must be at least 9 characters.',
  }),
  address: z.string().min(2, {
    message: 'Address must be at least 2 characters.',
  }),
});

export type CustomerSchema = z.infer<typeof customerSchema>;
