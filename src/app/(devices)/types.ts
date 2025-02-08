import { Device } from '@prisma/client';

export type DevicePayload = Omit<Device, 'id' | 'createdAt' | 'updatedAt'>;
