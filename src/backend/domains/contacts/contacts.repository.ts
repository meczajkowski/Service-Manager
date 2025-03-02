/**
 * Contacts Repository
 *
 * This module provides repository operations for managing contacts.
 * It includes functions for creating, updating, and retrieving contacts
 * with their associated customers.
 *
 * This module is used by the contacts service to perform repository operations.
 * Only the contacts service should use this module.
 * This module is the only module that should be used to perform repository operations on contacts.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/backend/domains/contacts
 */

import { executeRepositoryOperation } from '@/backend/common/helpers/repository.helper';
import { IBaseRepository } from '@/backend/common/interfaces/repository.interface';
import { fromPrismaToContactDto } from '@/backend/common/mappers/contact.mapper';
import {
  ContactDto,
  CreateContactDto,
  UpdateContactDto,
} from '@/types/contact.dto';
import { PrismaClient } from '@prisma/client';

/**
 * Interface for the contacts repository
 * Extends the base repository interface with contact-specific methods
 */
export interface IContactsRepository
  extends IBaseRepository<ContactDto, CreateContactDto, UpdateContactDto> {
  /**
   * Finds all contacts for a customer
   * @param customerId - The ID of the customer to find contacts for
   * @returns An array of contacts (empty array if none found)
   */
  findAllForCustomer(customerId: string): Promise<ContactDto[]>;
}

/**
 * Contacts repository implementation
 */
export class ContactsRepository implements IContactsRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: CreateContactDto): Promise<ContactDto> {
    return executeRepositoryOperation(async () => {
      const { customerId, ...createData } = data;
      const contact = await this.prisma.contact.create({
        data: {
          ...createData,
          customers: {
            connect: customerId ? [{ id: customerId }] : [],
          },
        },
      });
      return fromPrismaToContactDto(contact);
    }, 'Failed to create contact');
  }

  async findById(id: string): Promise<ContactDto | null> {
    return executeRepositoryOperation(async () => {
      const contact = await this.prisma.contact.findUnique({
        where: { id },
      });

      if (!contact) {
        return null;
      }

      return fromPrismaToContactDto(contact);
    }, `Failed to find contact with ID ${id}`);
  }

  async findAll(): Promise<ContactDto[]> {
    return executeRepositoryOperation(async () => {
      const contacts = await this.prisma.contact.findMany();

      if (contacts.length === 0) {
        return [];
      }

      return contacts.map((contact) => fromPrismaToContactDto(contact));
    }, 'Failed to find all contacts');
  }

  async findAllForCustomer(customerId: string): Promise<ContactDto[]> {
    return executeRepositoryOperation(async () => {
      const contacts = await this.prisma.contact.findMany({
        where: {
          customers: {
            some: {
              id: customerId,
            },
          },
        },
      });

      if (contacts.length === 0) {
        return [];
      }

      return contacts.map((contact) => fromPrismaToContactDto(contact));
    }, `Failed to find contacts for customer with ID ${customerId}`);
  }

  async update(id: string, data: UpdateContactDto): Promise<ContactDto> {
    return executeRepositoryOperation(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...updateData } = data;
      const contact = await this.prisma.contact.update({
        where: { id },
        data: updateData,
      });

      return fromPrismaToContactDto(contact);
    }, `Failed to update contact with ID ${id}`);
  }

  async delete(id: string): Promise<void> {
    return executeRepositoryOperation(async () => {
      await this.prisma.contact.delete({
        where: { id },
      });
    }, `Failed to delete contact with ID ${id}`);
  }
}
