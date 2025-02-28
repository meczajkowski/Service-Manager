/**
 * Device Mappers
 *
 * This module provides functions for mapping between Prisma Device entities and DTOs.
 */

import { fromPrismaToCustomerDto } from '@/backend/common/mappers/customer.mapper';
import {
  DeviceDto,
  DeviceModel,
  DeviceWithRelationsDto,
} from '@/types/device.dto';
import { Customer, Device } from '@prisma/client';

/**
 * Maps a Prisma Device entity to a DeviceDto
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
  customer: fromPrismaToCustomerDto(device.customer),
});
