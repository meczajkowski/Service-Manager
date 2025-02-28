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
 * @module src/services/customers.service
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

interface ICustomersService {
  create(data: CreateCustomerDto): Promise<CustomerDto>;
  get(id: string): Promise<CustomerDto | null>;
  getWithRelations(id: string): Promise<CustomerWithRelationsDto | null>;
  getAll(): Promise<CustomerDto[]>;
  update(data: UpdateCustomerDto): Promise<CustomerDto>;
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
    return customersRepository.update(data.id, data);
  },

  async delete(id) {
    await authService.requireAnyRole([UserRole.ADMIN]);
    await customersRepository.delete(id);
  },
};
