import { ServiceOrderStatus } from '@/types/service-order.dto';
import { z } from 'zod';

export const serviceOrderSchema = z.object({
  deviceId: z.string().min(1, 'Device is required'),
  troubleDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters'),
  assignedToId: z.string().min(1, 'Assigned to is required'),
  serviceOrderId: z.string().optional(),
  status: z.nativeEnum(ServiceOrderStatus),
});

export type ServiceOrderSchema = z.infer<typeof serviceOrderSchema>;
