/**
 * Customers Repository
 *
 * This module provides repository operations for managing customers.
 * It includes functions for creating, updating, and retrieving customers
 * with their associated devices and contacts.
 *
 * This module is used by the customers service to perform repository operations.
 * Only the customers service should use this module.
 * This module is the only module that should be used to perform repository operations on customers.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/backend/domains/customers
 */

import { executeRepositoryOperation } from '@/backend/common/helpers/repository.helper';
import { IBaseRepository } from '@/backend/common/interfaces/repository.interface';
import {
  fromPrismaToCustomerDto,
  fromPrismaToCustomerWithRelationsDto,
} from '@/backend/common/mappers/customer.mapper';
import {
  CreateCustomerDto,
  CustomerDto,
  CustomerWithRelationsDto,
  UpdateCustomerDto,
} from '@/types/customer.dto';
import { type PrismaClient } from '@prisma/client';

/**
 * Interface for the customers repository
 * Extends the base repository interface with customer-specific methods
 */
export interface ICustomersRepository
  extends IBaseRepository<CustomerDto, CreateCustomerDto, UpdateCustomerDto> {
  /**
   * Finds a customer by ID with relations
   * @param id - The ID of the customer to find
   * @returns The customer with relations or null if not found
   */
  findByIdWithRelations(id: string): Promise<CustomerWithRelationsDto | null>;
}

/**
 * Customers repository implementation
 */
export class CustomersRepository implements ICustomersRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: CreateCustomerDto): Promise<CustomerDto> {
    return executeRepositoryOperation(async () => {
      const customer = await this.prisma.customer.create({
        data,
      });
      return fromPrismaToCustomerDto(customer);
    }, 'Failed to create customer');
  }

  async findById(id: string): Promise<CustomerDto | null> {
    return executeRepositoryOperation(async () => {
      const customer = await this.prisma.customer.findUnique({
        where: { id },
      });

      if (!customer) {
        return null;
      }

      return fromPrismaToCustomerDto(customer);
    }, `Failed to find customer with ID ${id}`);
  }

  async findByIdWithRelations(
    id: string,
  ): Promise<CustomerWithRelationsDto | null> {
    return executeRepositoryOperation(async () => {
      const customer = await this.prisma.customer.findUnique({
        where: { id },
        include: {
          devices: true,
          contacts: true,
        },
      });

      if (!customer) {
        return null;
      }

      return fromPrismaToCustomerWithRelationsDto(customer);
    }, `Failed to find customer with relations with ID ${id}`);
  }

  async findAll(): Promise<CustomerDto[]> {
    return executeRepositoryOperation(async () => {
      const customers = await this.prisma.customer.findMany();

      if (customers.length === 0) {
        return [];
      }

      return customers.map((customer) => fromPrismaToCustomerDto(customer));
    }, 'Failed to find all customers');
  }

  async update(id: string, data: UpdateCustomerDto): Promise<CustomerDto> {
    return executeRepositoryOperation(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...updateData } = data;
      const customer = await this.prisma.customer.update({
        where: { id },
        data: updateData,
      });

      return fromPrismaToCustomerDto(customer);
    }, `Failed to update customer with ID ${id}`);
  }

  async delete(id: string): Promise<void> {
    return executeRepositoryOperation(async () => {
      await this.prisma.customer.delete({
        where: { id },
      });
    }, `Failed to delete customer with ID ${id}`);
  }
}
