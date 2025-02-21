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

import { serviceOrdersDb } from '@/db/serviceOrders';
import {
  CreateServiceOrderDto,
  ServiceOrderDto,
  ServiceOrderWithRelationsDto,
  UpdateServiceOrderDto,
} from '@/types/service-order.dto';
import { UserRole } from '@/types/user.dto';
import { authService } from './auth.service';
import { getDevice } from './devices.service';

interface ServiceOrdersService {
  create(data: CreateServiceOrderDto): Promise<ServiceOrderWithRelationsDto>;
  get(id: ServiceOrderDto['id']): Promise<ServiceOrderDto>;
  getWithRelations(
    id: ServiceOrderWithRelationsDto['id'],
  ): Promise<ServiceOrderWithRelationsDto>;
  getAll(): Promise<Array<ServiceOrderDto>>;
  getAllWithRelations(): Promise<Array<ServiceOrderWithRelationsDto>>;
  update(data: UpdateServiceOrderDto): Promise<ServiceOrderWithRelationsDto>;
}

export const serviceOrders: ServiceOrdersService = {
  async create(data) {
    // Only ADMIN and TECHNICIAN can create service orders
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);
    const device = await getDevice(data.deviceId);
    if (!device) {
      throw new Error('Device not found');
    }
    return serviceOrdersDb.create(data);
  },

  async get(id) {
    await authService.requireAuth();
    return serviceOrdersDb.findById(id);
  },

  async getWithRelations(id) {
    await authService.requireAuth();
    return serviceOrdersDb.findByIdWithRelations(id);
  },

  async getAll() {
    await authService.requireAuth();
    return serviceOrdersDb.findAll();
  },

  async getAllWithRelations() {
    await authService.requireAuth();
    return serviceOrdersDb.findAllWithRelations();
  },

  async update(data) {
    // Only ADMIN and TECHNICIAN can update service orders
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);
    const serviceOrder = await this.get(data.serviceOrderId);
    if (!serviceOrder) {
      throw new Error('Service order not found');
    }
    return serviceOrdersDb.update(data);
  },
};
