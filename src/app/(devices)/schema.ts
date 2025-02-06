import { DeviceModel } from '@prisma/client';
import { z } from 'zod';

export const newDeviceSchema = z.object({
  model: z.nativeEnum(DeviceModel, {
    message: 'Model is required',
  }),
  serialNumber: z.string().min(1),
});
