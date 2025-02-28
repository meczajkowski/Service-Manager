import { z } from 'zod';
import { CustomerDto } from './customer.dto';

export enum DeviceModel {
  C224 = 'C224',
  C224e = 'C224e',
  C258 = 'C258',
  C250i = 'C250i',
  C251i = 'C251i',
}

export const deviceSchema = z.object({
  model: z.nativeEnum(DeviceModel, {
    message: 'Model is required',
  }),
  serialNumber: z.string().min(1),
  customerId: z.string().min(1).nullable(),
});
export type DeviceSchema = z.infer<typeof deviceSchema>;

export type DeviceDto = DeviceSchema & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// Device with customer relation
export type DeviceWithRelationsDto = DeviceDto & {
  customer: CustomerDto | null;
};

export type CreateDeviceDto = DeviceSchema;
export type UpdateDeviceDto = DeviceSchema & {
  id: string;
};
