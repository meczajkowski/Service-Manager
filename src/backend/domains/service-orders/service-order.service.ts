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
 * @module src/backend/domains/service-orders
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

/**
 * View model for service order table display
 * Contains only the necessary fields for table display
 */
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

/**
 * View model for service order details display
 * Contains all fields needed for a detailed view of a service order
 */
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

/**
 * Transforms a service order with relations to a table view model
 * @param serviceOrder - The service order with relations to transform
 * @returns The table view model
 */
const toTableViewModel = (
  serviceOrder: ServiceOrderWithRelationsDto,
): ServiceOrderTableViewModel => ({
  ...serviceOrder,
  deviceSerialNumber: serviceOrder.device.serialNumber,
  customerName: serviceOrder.device.customer?.name ?? null,
  assignedToName: serviceOrder.assignedTo?.name ?? null,
});

/**
 * Transforms a service order with relations to a details view model
 * @param serviceOrder - The service order with relations to transform
 * @returns The details view model
 */
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

/**
 * Interface for the service orders service
 * Provides methods for managing service orders with proper authorization
 */
interface IServiceOrdersService {
  /**
   * Creates a new service order
   * @param data - The data to create the service order with
   * @returns The created service order
   * @throws Error if not authorized, if device not found, or if creation fails
   */
  create(data: CreateServiceOrderDto): Promise<ServiceOrderDto>;

  /**
   * Gets a service order by ID
   * @param id - The ID of the service order to get
   * @returns The service order or null if not found
   * @throws Error if not authorized
   */
  get(id: string): Promise<ServiceOrderDto | null>;

  /**
   * Gets a service order by ID with relations
   * @param id - The ID of the service order to get
   * @returns The service order with relations or null if not found
   * @throws Error if not authorized
   */
  getWithRelations(id: string): Promise<ServiceOrderWithRelationsDto | null>;

  /**
   * Gets all service orders
   * @returns An array of service orders (empty array if none found)
   * @throws Error if not authorized
   */
  getAll(): Promise<ServiceOrderDto[]>;

  /**
   * Gets all service orders with relations
   * @returns An array of service orders with relations (empty array if none found)
   * @throws Error if not authorized
   */
  getAllWithRelations(): Promise<ServiceOrderWithRelationsDto[]>;

  /**
   * Gets all service orders formatted for table display
   * @returns An array of service order table view models (empty array if none found)
   * @throws Error if not authorized
   */
  getAllForTable(): Promise<ServiceOrderTableViewModel[]>;

  /**
   * Gets detailed information for a service order
   * @param id - The ID of the service order to get details for
   * @returns The service order details view model or null if not found
   * @throws Error if not authorized
   */
  getDetails(id: string): Promise<ServiceOrderDetailsViewModel | null>;

  /**
   * Updates a service order
   * @param data - The data to update the service order with
   * @returns The updated service order
   * @throws Error if not authorized, if service order not found, or if update fails
   */
  update(data: UpdateServiceOrderDto): Promise<ServiceOrderDto>;
}

export const serviceOrdersService: IServiceOrdersService = {
  async create(data) {
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);

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
