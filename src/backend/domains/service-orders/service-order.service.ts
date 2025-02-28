/**
 * Service Orders Service
 *
 * This module provides a service for managing service orders.
 * It includes functions for creating, updating, and retrieving service orders
 * with their associated devices and users.
 *
 * This module is used by the server actions to perform service operations.
 * Do not use ORM directly here. Use the repository instead.
 * This module should not contain any ORM related logic.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/services/service-orders.service
 */

import { serviceOrdersRepository } from '@/backend/domains/service-orders/service-order.repository';
import {
  CreateServiceOrderDto,
  ServiceOrderDto,
  ServiceOrderWithRelationsDto,
  UpdateServiceOrderDto,
} from '@/types/service-order.dto';
import { UserRole } from '@/types/user.dto';
import { authService } from '../auth/auth.service';
import { devicesService } from '../devices/device.service';

// View models for specific UI needs
export interface ServiceOrderTableViewModel {
  id: string;
  troubleDescription: string;
  status: string;
  deviceSerialNumber: string;
  customerName: string | null;
  assignedToName: string | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceOrderDetailsViewModel {
  id: string;
  troubleDescription: string;
  status: string;
  deviceId: string;
  deviceSerialNumber: string;
  deviceModel: string;
  customerId: string | null;
  customerName: string | null;
  customerEmail: string | null;
  assignedToId: string | null;
  assignedToName: string | null;
  assignedToEmail: string | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Transformers
const toTableViewModel = (
  serviceOrder: ServiceOrderWithRelationsDto,
): ServiceOrderTableViewModel => ({
  ...serviceOrder,
  deviceSerialNumber: serviceOrder.device.serialNumber,
  customerName: serviceOrder.device.customer?.name ?? null,
  assignedToName: serviceOrder.assignedTo?.name ?? null,
});

const toDetailsViewModel = (
  serviceOrder: ServiceOrderWithRelationsDto,
): ServiceOrderDetailsViewModel => ({
  ...serviceOrder,
  deviceSerialNumber: serviceOrder.device.serialNumber,
  deviceModel: serviceOrder.device.model,
  customerId: serviceOrder.device.customerId ?? null,
  customerName: serviceOrder.device.customer?.name ?? null,
  customerEmail: serviceOrder.device.customer?.email ?? null,
  assignedToName: serviceOrder.assignedTo?.name ?? null,
  assignedToEmail: serviceOrder.assignedTo?.email ?? null,
});

interface IServiceOrdersService {
  create(data: CreateServiceOrderDto): Promise<ServiceOrderDto>;
  get(id: string): Promise<ServiceOrderDto | null>;
  getWithRelations(id: string): Promise<ServiceOrderWithRelationsDto | null>;
  getAll(): Promise<ServiceOrderDto[]>;
  getAllWithRelations(): Promise<ServiceOrderWithRelationsDto[]>;
  getAllForTable(): Promise<ServiceOrderTableViewModel[]>;
  getDetails(id: string): Promise<ServiceOrderDetailsViewModel | null>;
  update(data: UpdateServiceOrderDto): Promise<ServiceOrderDto>;
}

export const serviceOrdersService: IServiceOrdersService = {
  async create(data) {
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);

    // TODO: this should be not in the service layer
    const device = await devicesService.get(data.deviceId);
    if (!device) {
      throw new Error('Device not found');
    }
    return serviceOrdersRepository.create(data);
  },

  async get(id) {
    await authService.requireAuth();
    return serviceOrdersRepository.findById(id);
  },

  async getWithRelations(id) {
    await authService.requireAuth();
    return serviceOrdersRepository.findByIdWithRelations(id);
  },

  async getAll() {
    await authService.requireAuth();
    return serviceOrdersRepository.findAll();
  },

  async getAllWithRelations() {
    await authService.requireAuth();
    return serviceOrdersRepository.findAllWithRelations();
  },

  async getAllForTable() {
    await authService.requireAuth();
    const serviceOrders = await serviceOrdersRepository.findAllWithRelations();
    return serviceOrders.map(toTableViewModel);
  },

  async getDetails(id) {
    await authService.requireAuth();
    const serviceOrder =
      await serviceOrdersRepository.findByIdWithRelations(id);
    if (!serviceOrder) return null;
    return toDetailsViewModel(serviceOrder);
  },

  async update(data) {
    // Only ADMIN and TECHNICIAN can update service orders
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);
    const serviceOrder = await this.get(data.serviceOrderId);
    if (!serviceOrder) {
      throw new Error('Service order not found');
    }
    return serviceOrdersRepository.update(data.serviceOrderId, data);
  },
};
