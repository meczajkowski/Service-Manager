/**
 * Service Orders Service
 *
 * This module provides service operations for managing service orders.
 * It includes functions for creating, updating, and retrieving service orders
 * with their associated devices and users.
 *
 * This module is used by the API routes and server actions to perform service operations.
 * This module is the only module that should be used to perform service operations on service orders.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/backend/domains/service-orders
 */

import { IAuthService } from '@/backend/domains/auth/auth.service';
import { IDevicesService } from '@/backend/domains/devices/devices.service';
import { IUsersService } from '@/backend/domains/users/users.service';
import {
  CreateServiceOrderDto,
  ServiceOrderDto,
  ServiceOrderWithRelationsDto,
  UpdateServiceOrderDto,
} from '@/types/service-order.dto';
import { UserRole } from '@/types/user.dto';
import { IServiceOrdersRepository } from './service-orders.repository';

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
 */
export interface IServiceOrdersService {
  /**
   * Creates a new service order
   * @param data - The data for the new service order
   * @returns The created service order
   * @throws NotFoundError if device not found
   * @throws UnauthorizedError if not authorized or assigned user is not a technician
   */
  create(data: CreateServiceOrderDto): Promise<ServiceOrderDto>;

  /**
   * Gets a service order by ID
   * @param id - The ID of the service order to get
   * @returns The service order
   * @throws NotFoundError if service order not found
   * @throws UnauthorizedError if not authorized
   */
  get(id: string): Promise<ServiceOrderDto>;

  /**
   * Gets a service order by ID with relations
   * @param id - The ID of the service order to get
   * @returns The service order with relations
   * @throws NotFoundError if service order not found
   * @throws UnauthorizedError if not authorized
   */
  getWithRelations(id: string): Promise<ServiceOrderWithRelationsDto>;

  /**
   * Gets all service orders
   * @returns An array of service orders (empty array if none found)
   * @throws UnauthorizedError if not authorized
   */
  getAll(): Promise<ServiceOrderDto[]>;

  /**
   * Gets all service orders with relations
   * @returns An array of service orders with relations (empty array if none found)
   * @throws UnauthorizedError if not authorized
   */
  getAllWithRelations(): Promise<ServiceOrderWithRelationsDto[]>;

  /**
   * Gets all service orders formatted for table display
   * @returns An array of service order table view models (empty array if none found)
   * @throws UnauthorizedError if not authorized
   */
  getAllForTable(): Promise<ServiceOrderTableViewModel[]>;

  /**
   * Gets detailed information for a service order
   * @param id - The ID of the service order to get details for
   * @returns The service order details view model or null if not found
   * @throws UnauthorizedError if not authorized
   */
  getDetails(id: string): Promise<ServiceOrderDetailsViewModel | null>;

  /**
   * Updates a service order
   * @param id - The ID of the service order to update
   * @param data - The data to update the service order with
   * @returns The updated service order
   * @throws NotFoundError if service order not found
   * @throws UnauthorizedError if not authorized or assigned user is not a technician
   */
  update(id: string, data: UpdateServiceOrderDto): Promise<ServiceOrderDto>;

  /**
   * Deletes a service order
   * @param id - The ID of the service order to delete
   * @throws NotFoundError if service order not found
   * @throws UnauthorizedError if not authorized or not an admin
   */
  delete(id: string): Promise<void>;
}

/**
 * Service orders service implementation
 */
export class ServiceOrdersService implements IServiceOrdersService {
  constructor(
    private serviceOrdersRepository: IServiceOrdersRepository,
    private devicesService: IDevicesService,
    private usersService: IUsersService,
    private authService: IAuthService,
  ) {}

  async create(data: CreateServiceOrderDto): Promise<ServiceOrderDto> {
    // Ensure the current user is authenticated and has the right role
    await this.authService.requireAnyRole([
      UserRole.ADMIN,
      UserRole.TECHNICIAN,
    ]);

    // Ensure the device exists
    const device = await this.devicesService.get(data.deviceId);
    if (!device) {
      throw new Error(`Device with ID ${data.deviceId} not found`);
    }

    // If assignedToId is provided, ensure the user exists and has the TECHNICIAN role
    if (data.assignedToId) {
      const assignedUser = await this.usersService.get(data.assignedToId);
      if (!assignedUser) {
        throw new Error(`User with ID ${data.assignedToId} not found`);
      }
      if (assignedUser.role !== UserRole.TECHNICIAN) {
        throw new Error(
          `User with ID ${data.assignedToId} is not a technician`,
        );
      }
    }

    // Create the service order
    return this.serviceOrdersRepository.create(data);
  }

  async get(id: string): Promise<ServiceOrderDto> {
    // Ensure the current user is authenticated
    await this.authService.requireAuth();

    // Get the service order
    const serviceOrder = await this.serviceOrdersRepository.findById(id);
    if (!serviceOrder) {
      throw new Error(`Service order with ID ${id} not found`);
    }

    return serviceOrder;
  }

  async getWithRelations(id: string): Promise<ServiceOrderWithRelationsDto> {
    // Ensure the current user is authenticated
    await this.authService.requireAuth();

    // Get the service order with relations
    const serviceOrder =
      await this.serviceOrdersRepository.findByIdWithRelations(id);
    if (!serviceOrder) {
      throw new Error(`Service order with ID ${id} not found`);
    }

    return serviceOrder;
  }

  async getAll(): Promise<ServiceOrderDto[]> {
    // Ensure the current user is authenticated
    await this.authService.requireAuth();

    // Get all service orders
    return this.serviceOrdersRepository.findAll();
  }

  async getAllWithRelations(): Promise<ServiceOrderWithRelationsDto[]> {
    // Ensure the current user is authenticated
    await this.authService.requireAuth();

    // Get all service orders with relations
    return this.serviceOrdersRepository.findAllWithRelations();
  }

  /**
   * Gets all service orders formatted for table display
   * @returns An array of service order table view models
   */
  async getAllForTable(): Promise<ServiceOrderTableViewModel[]> {
    // Ensure the current user is authenticated
    await this.authService.requireAuth();

    // Get all service orders with relations and transform to table view models
    const serviceOrders =
      await this.serviceOrdersRepository.findAllWithRelations();
    return serviceOrders.map(toTableViewModel);
  }

  /**
   * Gets detailed information for a service order
   * @param id - The ID of the service order to get details for
   * @returns The service order details view model or null if not found
   */
  async getDetails(id: string): Promise<ServiceOrderDetailsViewModel | null> {
    // Ensure the current user is authenticated
    await this.authService.requireAuth();

    // Get the service order with relations
    const serviceOrder =
      await this.serviceOrdersRepository.findByIdWithRelations(id);
    if (!serviceOrder) return null;

    // Transform to details view model
    return toDetailsViewModel(serviceOrder);
  }

  async update(
    id: string,
    data: UpdateServiceOrderDto,
  ): Promise<ServiceOrderDto> {
    // Ensure the current user is authenticated and has the right role
    await this.authService.requireAnyRole([
      UserRole.ADMIN,
      UserRole.TECHNICIAN,
    ]);

    // Get the service order
    const serviceOrder = await this.get(id);
    if (!serviceOrder) {
      throw new Error(`Service order with ID ${id} not found`);
    }

    // If assignedToId is provided, ensure the user exists and has the TECHNICIAN role
    if (data.assignedToId) {
      const assignedUser = await this.usersService.get(data.assignedToId);
      if (!assignedUser) {
        throw new Error(`User with ID ${data.assignedToId} not found`);
      }
      if (assignedUser.role !== UserRole.TECHNICIAN) {
        throw new Error(
          `User with ID ${data.assignedToId} is not a technician`,
        );
      }
    }

    // Update the service order
    return this.serviceOrdersRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    // Ensure the current user is authenticated and has the ADMIN role
    await this.authService.requireAnyRole([UserRole.ADMIN]);

    // Ensure the service order exists
    const serviceOrder = await this.get(id);
    if (!serviceOrder) {
      throw new Error(`Service order with ID ${id} not found`);
    }

    // Delete the service order
    await this.serviceOrdersRepository.delete(id);
  }
}
