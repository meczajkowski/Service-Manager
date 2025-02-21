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
  CreateServiceOrderDto,
  ServiceOrderDto,
  ServiceOrderStatus,
  ServiceOrderWithRelationsDto,
  UpdateServiceOrderDto,
} from '@/types/service-order.dto';
import { UserRole } from '@/types/user.dto';
import {
  Customer,
  Device,
  ServiceOrder,
  ServiceStatus,
  User,
} from '@prisma/client';
import { prisma } from '../../lib/prisma';

interface IServiceOrdersRepository {
  create(data: CreateServiceOrderDto): Promise<ServiceOrderWithRelationsDto>;
  findById(id: ServiceOrderDto['id']): Promise<ServiceOrderDto>;
  findByIdWithRelations(
    id: ServiceOrderWithRelationsDto['id'],
  ): Promise<ServiceOrderWithRelationsDto>;
  findAll(): Promise<Array<ServiceOrderDto>>;
  findAllWithRelations(): Promise<Array<ServiceOrderWithRelationsDto>>;
  update(data: UpdateServiceOrderDto): Promise<ServiceOrderWithRelationsDto>;
}

type ServiceOrderWithRelations = ServiceOrder & {
  device: Device & {
    customer: Customer | null;
  };
  assignedTo: User | null;
};

const fromPrismaToDto = (serviceOrder: ServiceOrder): ServiceOrderDto => ({
  id: serviceOrder.id,
  troubleDescription: serviceOrder.troubleDescription,
  status: serviceOrder.status as ServiceOrderStatus,
  deviceId: serviceOrder.deviceId,
  assignedToId: serviceOrder.assignedToId,
  completedAt: serviceOrder.completedAt,
  createdAt: serviceOrder.createdAt,
  updatedAt: serviceOrder.updatedAt,
});

const fromPrismaToDtoWithRelations = (
  serviceOrder: ServiceOrderWithRelations,
): ServiceOrderWithRelationsDto => {
  return {
    id: serviceOrder.id,
    troubleDescription: serviceOrder.troubleDescription,
    status: serviceOrder.status as ServiceOrderStatus,
    device: {
      id: serviceOrder.device.id,
      serialNumber: serviceOrder.device.serialNumber,
      model: serviceOrder.device.model,
      customer: serviceOrder.device.customer
        ? {
            id: serviceOrder.device.customer.id,
            name: serviceOrder.device.customer.name,
            email: serviceOrder.device.customer.email,
            phone: serviceOrder.device.customer.phone,
            address: serviceOrder.device.customer.address,
            createdAt: serviceOrder.device.customer.createdAt,
            updatedAt: serviceOrder.device.customer.updatedAt,
          }
        : null,
    },
    assignedTo: serviceOrder.assignedTo
      ? {
          id: serviceOrder.assignedTo.id,
          name: serviceOrder.assignedTo.name,
          email: serviceOrder.assignedTo.email,
          image: serviceOrder.assignedTo.image,
          role: serviceOrder.assignedTo.role as UserRole,
          createdAt: serviceOrder.assignedTo.createdAt,
          updatedAt: serviceOrder.assignedTo.updatedAt,
        }
      : null,
    completedAt: serviceOrder.completedAt,
    createdAt: serviceOrder.createdAt,
    updatedAt: serviceOrder.updatedAt,
  };
};

export const serviceOrdersRepository: IServiceOrdersRepository = {
  async create(data) {
    const serviceOrder = await prisma.serviceOrder.create({
      data: {
        troubleDescription: data.troubleDescription,
        status: data.status as ServiceStatus,
        device: {
          connect: { id: data.deviceId },
        },
        assignedTo: data.assignedToId
          ? { connect: { id: data.assignedToId } }
          : undefined,
      },
      include: {
        device: {
          include: {
            customer: true,
          },
        },
        assignedTo: true,
      },
    });

    return fromPrismaToDtoWithRelations(serviceOrder);
  },

  async findById(id) {
    const serviceOrder = await prisma.serviceOrder.findUnique({
      where: { id },
    });

    if (!serviceOrder) {
      throw new Error('Service order not found');
    }

    return fromPrismaToDto(serviceOrder);
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
      throw new Error('Service order not found');
    }

    return fromPrismaToDtoWithRelations(serviceOrder);
  },

  async findAll() {
    const serviceOrders = await prisma.serviceOrder.findMany();
    return serviceOrders.map(fromPrismaToDto);
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

    return serviceOrders.map(fromPrismaToDtoWithRelations);
  },

  async update(data) {
    const { serviceOrderId, assignedToId, ...updateData } = data;

    const serviceOrder = await prisma.serviceOrder.update({
      where: { id: serviceOrderId },
      data: {
        ...updateData,
        assignedTo: assignedToId
          ? { connect: { id: assignedToId } }
          : undefined,
        status: updateData.status as ServiceStatus,
      },
      include: {
        device: {
          include: {
            customer: true,
          },
        },
        assignedTo: true,
      },
    });

    return fromPrismaToDtoWithRelations(serviceOrder);
  },
};
