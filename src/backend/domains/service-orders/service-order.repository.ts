/**
 * Service Orders Repository
 *
 * This module provides repository operations for managing service orders.
 * It includes functions for creating, updating, and retrieving service orders
 * with their associated devices and users.
 *
 * This module is used by the service orders service to perform repository operations.
 * Only the service orders service should use this module.
 * This module is the only module that should be used to perform repository operations on service orders.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/backend/domains/service-orders
 */

import { executeRepositoryOperation } from '@/backend/common/helpers/repository.helper';
import { IBaseRepository } from '@/backend/common/interfaces/repository.interface';
import {
  fromPrismaToServiceOrderDto,
  fromPrismaToServiceOrderWithRelationsDto,
} from '@/backend/common/mappers/service-order.mapper';
import {
  CreateServiceOrderDto,
  ServiceOrderDto,
  ServiceOrderWithRelationsDto,
  UpdateServiceOrderDto,
} from '@/types/service-order.dto';
import { prisma } from '../../../lib/prisma';

/**
 * Interface for the service orders repository
 * Extends the base repository interface with service order-specific methods
 */
interface IServiceOrdersRepository
  extends IBaseRepository<
    ServiceOrderDto,
    CreateServiceOrderDto,
    UpdateServiceOrderDto
  > {
  /**
   * Finds a service order by ID with relations
   * @param id - The ID of the service order to find
   * @returns The service order with relations or null if not found
   */
  findByIdWithRelations(
    id: string,
  ): Promise<ServiceOrderWithRelationsDto | null>;

  /**
   * Finds all service orders with relations
   * @returns An array of service orders with relations (empty array if none found)
   */
  findAllWithRelations(): Promise<ServiceOrderWithRelationsDto[]>;
}

export const serviceOrdersRepository: IServiceOrdersRepository = {
  async create(data) {
    return executeRepositoryOperation(async () => {
      const serviceOrder = await prisma.serviceOrder.create({
        data,
      });

      return fromPrismaToServiceOrderDto(serviceOrder);
    }, 'Failed to create service order');
  },

  async findById(id) {
    return executeRepositoryOperation(async () => {
      const serviceOrder = await prisma.serviceOrder.findUnique({
        where: { id },
      });

      if (!serviceOrder) {
        return null;
      }

      return fromPrismaToServiceOrderDto(serviceOrder);
    }, `Failed to find service order with ID ${id}`);
  },

  async findByIdWithRelations(id) {
    return executeRepositoryOperation(async () => {
      const serviceOrder = await prisma.serviceOrder.findUnique({
        where: { id },
        include: {
          device: {
            include: {
              customer: true,
            },
          },
          assignedTo: true,
        },
      });

      if (!serviceOrder) {
        return null;
      }

      return fromPrismaToServiceOrderWithRelationsDto(serviceOrder);
    }, `Failed to find service order with relations with ID ${id}`);
  },

  async findAll() {
    return executeRepositoryOperation(async () => {
      const serviceOrders = await prisma.serviceOrder.findMany();

      if (serviceOrders.length === 0) {
        return [];
      }

      return serviceOrders.map(fromPrismaToServiceOrderDto);
    }, 'Failed to find all service orders');
  },

  async findAllWithRelations() {
    return executeRepositoryOperation(async () => {
      const serviceOrders = await prisma.serviceOrder.findMany({
        include: {
          device: {
            include: {
              customer: true,
            },
          },
          assignedTo: true,
        },
      });

      if (serviceOrders.length === 0) {
        return [];
      }

      return serviceOrders.map(fromPrismaToServiceOrderWithRelationsDto);
    }, 'Failed to find all service orders with relations');
  },

  async update(id, data) {
    return executeRepositoryOperation(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { serviceOrderId, ...updateData } = data;
      const serviceOrder = await prisma.serviceOrder.update({
        where: { id },
        data: {
          troubleDescription: updateData.troubleDescription,
          status: updateData.status,
          assignedToId: updateData.assignedToId,
        },
      });

      return fromPrismaToServiceOrderDto(serviceOrder);
    }, `Failed to update service order with ID ${id}`);
  },

  async delete(id) {
    return executeRepositoryOperation(async () => {
      await prisma.serviceOrder.delete({
        where: { id },
      });
    }, `Failed to delete service order with ID ${id}`);
  },
};
