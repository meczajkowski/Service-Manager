/**
 * Customers Service
 *
 * This module provides a service for managing customers.
 * It includes functions for creating, updating, and retrieving customers
 * with their associated devices and contacts.
 *
 * This module is used by the server actions to perform service operations.
 * Do not use ORM directly here. Use the repository instead.
 * This module should not contain any ORM related logic.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/backend/domains/customers
 */

import { customersRepository } from '@/backend/domains/customers/customer.repository';
import {
  CreateCustomerDto,
  CustomerDto,
  CustomerWithRelationsDto,
  UpdateCustomerDto,
} from '@/types/customer.dto';
import { UserRole } from '@/types/user.dto';
import { authService } from '../auth/auth.service';

/**
 * Interface for the customers service
 * Provides methods for managing customers with proper authorization
 */
interface ICustomersService {
  /**
   * Creates a new customer
   * @param data - The data to create the customer with
   * @returns The created customer
   * @throws Error if not authorized or if creation fails
   */
  create(data: CreateCustomerDto): Promise<CustomerDto>;

  /**
   * Gets a customer by ID
   * @param id - The ID of the customer to get
   * @returns The customer or null if not found
   * @throws Error if not authorized
   */
  get(id: string): Promise<CustomerDto | null>;

  /**
   * Gets a customer by ID with relations (devices and contacts)
   * @param id - The ID of the customer to get
   * @returns The customer with relations or null if not found
   * @throws Error if not authorized
   */
  getWithRelations(id: string): Promise<CustomerWithRelationsDto | null>;

  /**
   * Gets all customers
   * @returns An array of customers (empty array if none found)
   * @throws Error if not authorized
   */
  getAll(): Promise<CustomerDto[]>;

  /**
   * Updates a customer
   * @param data - The data to update the customer with
   * @returns The updated customer
   * @throws Error if not authorized, if customer not found, or if update fails
   */
  update(data: UpdateCustomerDto): Promise<CustomerDto>;

  /**
   * Deletes a customer
   * @param id - The ID of the customer to delete
   * @throws Error if not authorized, if customer not found, or if deletion fails
   */
  delete(id: string): Promise<void>;
}

export const customersService: ICustomersService = {
  async create(data) {
    await authService.requireAnyRole([UserRole.ADMIN]);
    return customersRepository.create(data);
  },

  async get(id) {
    await authService.requireAuth();
    return customersRepository.findById(id);
  },

  async getWithRelations(id) {
    await authService.requireAuth();
    return customersRepository.findByIdWithRelations(id);
  },

  async getAll() {
    await authService.requireAuth();
    return customersRepository.findAll();
  },

  async update(data) {
    await authService.requireAnyRole([UserRole.ADMIN]);
    const customer = await this.get(data.id);
    if (!customer) {
      throw new Error(`Customer with ID ${data.id} not found`);
    }
    return customersRepository.update(data.id, data);
  },

  async delete(id) {
    await authService.requireAnyRole([UserRole.ADMIN]);
    const customer = await this.get(id);
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    await customersRepository.delete(id);
  },
};
