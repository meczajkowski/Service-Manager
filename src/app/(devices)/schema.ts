import { DeviceModel } from '@prisma/client';
import { z } from 'zod';

export const createDeviceSchema = z.object({
  model: z.nativeEnum(DeviceModel, {
    message: 'Model is required',
  }),
  serialNumber: z.string().min(1),
});

export type CreateDeviceSchema = z.infer<typeof createDeviceSchema>;
