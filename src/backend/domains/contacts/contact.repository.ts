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
 * @module src/repositories/contact
 */

import { executeRepositoryOperation } from '@/backend/common/helpers/repository.helper';
import { IBaseRepository } from '@/backend/common/interfaces/repository.interface';
import { fromPrismaToContactDto } from '@/backend/common/mappers/contact.mapper';
import {
  ContactDto,
  CreateContactDto,
  UpdateContactDto,
} from '@/types/contact.dto';
import { prisma } from '../../../lib/prisma';

/**
 * Interface for the contacts repository
 * Extends the base repository interface with contact-specific methods
 */
interface IContactsRepository
  extends IBaseRepository<ContactDto, CreateContactDto, UpdateContactDto> {
  /**
   * Finds all contacts for a customer
   * @param customerId - The ID of the customer to find contacts for
   * @returns An array of contacts
   */
  findAllForCustomer(customerId: string): Promise<ContactDto[]>;
}

export const contactsRepository: IContactsRepository = {
  async create(data) {
    return executeRepositoryOperation(async () => {
      const contact = await prisma.contact.create({
        data,
      });
      return fromPrismaToContactDto(contact);
    }, 'Failed to create contact');
  },

  async findById(id) {
    return executeRepositoryOperation(async () => {
      const contact = await prisma.contact.findUnique({
        where: { id },
      });

      if (!contact) {
        return null;
      }

      return fromPrismaToContactDto(contact);
    }, `Failed to find contact with ID ${id}`);
  },

  async findAll() {
    return executeRepositoryOperation(async () => {
      const contacts = await prisma.contact.findMany();

      if (contacts.length === 0) {
        return [];
      }

      return contacts.map((contact) => fromPrismaToContactDto(contact));
    }, 'Failed to find all contacts');
  },

  async findAllForCustomer(customerId) {
    return executeRepositoryOperation(async () => {
      const contacts = await prisma.contact.findMany({
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
  },

  async update(id, data) {
    return executeRepositoryOperation(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...updateData } = data;
      const contact = await prisma.contact.update({
        where: { id },
        data: updateData,
      });

      return fromPrismaToContactDto(contact);
    }, `Failed to update contact with ID ${id}`);
  },

  async delete(id) {
    return executeRepositoryOperation(async () => {
      await prisma.contact.delete({
        where: { id },
      });
    }, `Failed to delete contact with ID ${id}`);
  },
};
