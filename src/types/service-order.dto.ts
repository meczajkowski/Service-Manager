import { z } from 'zod';
import { DeviceWithRelationsDto } from './device.dto';
import { UserDto } from './user.dto';

export enum ServiceOrderStatus {
  PENDING = 'PENDING',
  ISSUED = 'ISSUED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const serviceOrderSchema = z.object({
  deviceId: z.string().min(1, 'Device is required'),
  troubleDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  assignedToId: z.string().nullable(),
  status: z.nativeEnum(ServiceOrderStatus),
});
export type ServiceOrderSchema = z.infer<typeof serviceOrderSchema>;

// DTO for creating a service order
export type CreateServiceOrderDto = Omit<ServiceOrderSchema, 'serviceOrderId'>;

// DTO for updating a service order
export type UpdateServiceOrderDto = ServiceOrderSchema & {
  serviceOrderId: string;
};

// Basic service order response without relations
export type ServiceOrderDto = ServiceOrderSchema & {
  id: string;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

// Service order with all relations
export type ServiceOrderWithRelationsDto = ServiceOrderDto & {
  device: DeviceWithRelationsDto;
  assignedTo: UserDto | null;
};
