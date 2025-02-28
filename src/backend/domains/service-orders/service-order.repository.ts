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
 * @module src/repositories/service-order
 */

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

interface IServiceOrdersRepository {
  create(data: CreateServiceOrderDto): Promise<ServiceOrderDto>;
  findById(id: string): Promise<ServiceOrderDto | null>;
  findByIdWithRelations(
    id: string,
  ): Promise<ServiceOrderWithRelationsDto | null>;
  findAll(): Promise<ServiceOrderDto[]>;
  findAllWithRelations(): Promise<ServiceOrderWithRelationsDto[]>;
  update(data: UpdateServiceOrderDto): Promise<ServiceOrderDto>;
}

export const serviceOrdersRepository: IServiceOrdersRepository = {
  async create(data) {
    const serviceOrder = await prisma.serviceOrder.create({
      data: {
        troubleDescription: data.troubleDescription,
        status: data.status,
        deviceId: data.deviceId,
        assignedToId: data.assignedToId,
      },
    });

    return fromPrismaToServiceOrderDto(serviceOrder);
  },

  async findById(id) {
    const serviceOrder = await prisma.serviceOrder.findUnique({
      where: { id },
    });

    if (!serviceOrder) {
      return null;
    }

    return fromPrismaToServiceOrderDto(serviceOrder);
  },

  async findByIdWithRelations(id) {
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
  },

  async findAll() {
    const serviceOrders = await prisma.serviceOrder.findMany();
    return serviceOrders.map(fromPrismaToServiceOrderDto);
  },

  async findAllWithRelations() {
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

    return serviceOrders.map(fromPrismaToServiceOrderWithRelationsDto);
  },

  async update(data) {
    const serviceOrder = await prisma.serviceOrder.update({
      where: { id: data.serviceOrderId },
      data: {
        troubleDescription: data.troubleDescription,
        status: data.status,
        assignedToId: data.assignedToId,
      },
    });

    return fromPrismaToServiceOrderDto(serviceOrder);
  },
};
