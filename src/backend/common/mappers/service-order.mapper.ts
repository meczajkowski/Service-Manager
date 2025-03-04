/**
 * Service Order Mappers
 *
 * This module provides functions for mapping between Prisma ServiceOrder entities and DTOs.
 * Mappers should only be used when we are sure the entity exists.
 */

import { fromPrismaToDeviceWithRelationsDto } from '@/backend/common/mappers/device.mapper';
import { fromPrismaToUserDto } from '@/backend/common/mappers/user.mapper';
import {
  ServiceOrderDto,
  ServiceOrderStatus,
  ServiceOrderWithRelationsDto,
} from '@/types/service-order.dto';
import { Prisma, ServiceOrder } from '@prisma/client';

type ServiceOrderWithRelations = Prisma.ServiceOrderGetPayload<{
  include: {
    device: {
      include: {
        customer: true;
      };
    };
    assignedTo: true;
  };
}>;

/**
 * Maps a Prisma ServiceOrder entity to a ServiceOrderDto
 * @param serviceOrder - The Prisma ServiceOrder entity to map
 * @returns A ServiceOrderDto object
 */
export const fromPrismaToServiceOrderDto = (
  serviceOrder: ServiceOrder,
): ServiceOrderDto => ({
  id: serviceOrder.id,
  troubleDescription: serviceOrder.troubleDescription,
  status: serviceOrder.status as ServiceOrderStatus,
  deviceId: serviceOrder.deviceId,
  assignedToId: serviceOrder.assignedToId,
  completedAt: serviceOrder.completedAt,
  createdAt: serviceOrder.createdAt,
  updatedAt: serviceOrder.updatedAt,
});

/**
 * Maps a Prisma ServiceOrder entity with relations to a ServiceOrderWithRelationsDto
 * @param serviceOrder - The Prisma ServiceOrder entity with relations to map
 * @returns A ServiceOrderWithRelationsDto object
 */
export const fromPrismaToServiceOrderWithRelationsDto = (
  serviceOrder: ServiceOrderWithRelations,
): ServiceOrderWithRelationsDto => ({
  id: serviceOrder.id,
  troubleDescription: serviceOrder.troubleDescription,
  status: serviceOrder.status as ServiceOrderStatus,
  deviceId: serviceOrder.deviceId,
  assignedToId: serviceOrder.assignedToId,
  completedAt: serviceOrder.completedAt,
  createdAt: serviceOrder.createdAt,
  updatedAt: serviceOrder.updatedAt,
  device: fromPrismaToDeviceWithRelationsDto(serviceOrder.device),
  assignedTo: serviceOrder.assignedTo
    ? fromPrismaToUserDto(serviceOrder.assignedTo)
    : null,
});
