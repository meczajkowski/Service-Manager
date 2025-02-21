/**
 * Service Orders Service
 *
 * This module provides a service for managing service orders.
 * It includes functions for creating, updating, and retrieving service orders
 * with their associated devices and users.
 *
 * This module is used by the server actions to perform service operations.
 * Do not use ORM directly here. Use the db module instead.
 * This module should not contain any ORM related logic.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/services/service-orders.service
 */

import { serviceOrdersRepository } from '@/backend/service-orders/service-order.repository';
import {
  CreateServiceOrderDto,
  ServiceOrderDto,
  ServiceOrderWithRelationsDto,
  UpdateServiceOrderDto,
} from '@/types/service-order.dto';
import { UserRole } from '@/types/user.dto';
import { authService } from '../auth/auth.service';
import { getDevice } from '../devices/devices.service';

interface IServiceOrdersService {
  create(data: CreateServiceOrderDto): Promise<ServiceOrderWithRelationsDto>;
  get(id: ServiceOrderDto['id']): Promise<ServiceOrderDto>;
  getWithRelations(
    id: ServiceOrderWithRelationsDto['id'],
  ): Promise<ServiceOrderWithRelationsDto>;
  getAll(): Promise<Array<ServiceOrderDto>>;
  getAllWithRelations(): Promise<Array<ServiceOrderWithRelationsDto>>;
  update(data: UpdateServiceOrderDto): Promise<ServiceOrderWithRelationsDto>;
}

export const serviceOrders: IServiceOrdersService = {
  async create(data) {
    // Only ADMIN and TECHNICIAN can create service orders
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);
    const device = await getDevice(data.deviceId);
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

  async update(data) {
    // Only ADMIN and TECHNICIAN can update service orders
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);
    const serviceOrder = await this.get(data.serviceOrderId);
    if (!serviceOrder) {
      throw new Error('Service order not found');
    }
    return serviceOrdersRepository.update(data);
  },
};
