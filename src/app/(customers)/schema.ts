import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),

  email: z
    .string()
    .email({
      message: 'Invalid email address.',
    })
    .nullable(),
  phone: z
    .string()
    .min(9, {
      message: 'Phone number must be at least 9 characters.',
    })
    .nullable(),
  address: z.string().min(2, {
    message: 'Address must be at least 2 characters.',
  }),
});

export const customerWithIdSchema = z.object({
  id: z.string(),
  ...customerSchema.shape,
});
export type CustomerSchema = z.infer<typeof customerSchema>;
export type CustomerWithIdSchema = z.infer<typeof customerWithIdSchema>;
