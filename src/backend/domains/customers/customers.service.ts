/**
 * Customers Service
 *
 * This module provides service operations for managing customers.
 * It includes functions for creating, updating, and retrieving customers
 * with their associated devices and contacts.
 *
 * This module is used by the customers actions to perform service operations.
 * Only the customers actions should use this module.
 * This module is the only module that should be used to perform service operations on customers.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/backend/domains/customers
 */

import { IAuthService } from '@/backend/domains/auth/auth.service';
import {
  CreateCustomerDto,
  CustomerDto,
  CustomerWithRelationsDto,
  UpdateCustomerDto,
} from '@/types/customer.dto';
import { UserRole } from '@/types/user.dto';
import { ICustomersRepository } from './customers.repository';

/**
 * Interface for the customers service
 * Provides methods for managing customers with proper authorization
 */
export interface ICustomersService {
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

/**
 * Customers service implementation
 */
export class CustomersService implements ICustomersService {
  private customersRepository: ICustomersRepository;
  private authService: IAuthService;

  constructor(
    customersRepository: ICustomersRepository,
    authService: IAuthService,
  ) {
    this.customersRepository = customersRepository;
    this.authService = authService;
  }

  async create(data: CreateCustomerDto): Promise<CustomerDto> {
    await this.authService.requireAnyRole([UserRole.ADMIN]);
    return this.customersRepository.create(data);
  }

  async get(id: string): Promise<CustomerDto | null> {
    await this.authService.requireAuth();
    return this.customersRepository.findById(id);
  }

  async getWithRelations(id: string): Promise<CustomerWithRelationsDto | null> {
    await this.authService.requireAuth();
    return this.customersRepository.findByIdWithRelations(id);
  }

  async getAll(): Promise<CustomerDto[]> {
    await this.authService.requireAuth();
    return this.customersRepository.findAll();
  }

  async update(data: UpdateCustomerDto): Promise<CustomerDto> {
    await this.authService.requireAnyRole([UserRole.ADMIN]);
    const customer = await this.get(data.id);
    if (!customer) {
      throw new Error(`Customer with ID ${data.id} not found`);
    }
    return this.customersRepository.update(data.id, data);
  }

  async delete(id: string): Promise<void> {
    await this.authService.requireAnyRole([UserRole.ADMIN]);
    const customer = await this.get(id);
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    await this.customersRepository.delete(id);
  }
}
