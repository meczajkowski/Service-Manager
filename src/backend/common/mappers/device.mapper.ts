/**
 * Device Mappers
 *
 * This module provides functions for mapping between Prisma Device entities and DTOs.
 * Mappers should only be used when we are sure the entity exists.
 */

import {
  DeviceDto,
  DeviceModel,
  DeviceWithRelationsDto,
} from '@/types/device.dto';
import { Customer, Device } from '@prisma/client';
import { mapCustomerRelationForDevice } from './relations.mapper';

/**
 * Maps a Prisma Device entity to a DeviceDto
 * @param device - The Prisma Device entity to map
 * @returns A DeviceDto object
 */
export const fromPrismaToDeviceDto = (device: Device): DeviceDto => ({
  id: device.id,
  model: device.model as DeviceModel,
  serialNumber: device.serialNumber,
  customerId: device.customerId,
  createdAt: device.createdAt,
  updatedAt: device.updatedAt,
});

/**
 * Maps a Prisma Device entity with relations to a DeviceWithRelationsDto
 * @param device - The Prisma Device entity with relations to map
 * @returns A DeviceWithRelationsDto object
 */
export const fromPrismaToDeviceWithRelationsDto = (
  device: Device & { customer: Customer | null },
): DeviceWithRelationsDto => ({
  id: device.id,
  model: device.model as DeviceModel,
  serialNumber: device.serialNumber,
  customerId: device.customerId,
  createdAt: device.createdAt,
  updatedAt: device.updatedAt,
  customer: device.customer
    ? mapCustomerRelationForDevice(device.customer)
    : null,
});
