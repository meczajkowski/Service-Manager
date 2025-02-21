import { DeviceModel } from '@prisma/client';
import { z } from 'zod';

export const deviceSchema = z.object({
  model: z.nativeEnum(DeviceModel, {
    message: 'Model is required',
  }),
  serialNumber: z.string().min(1),
  customerId: z.string().min(1).optional(),
});

export type DeviceSchema = z.infer<typeof deviceSchema>;
