/**
 * Contacts Service
 *
 * This module provides service operations for managing contacts.
 * It includes functions for creating, updating, and retrieving contacts
 * with their associated customers.
 *
 * This module is used by the contacts actions to perform service operations.
 * Only the contacts actions should use this module.
 * This module is the only module that should be used to perform service operations on contacts.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/backend/domains/contacts
 */

import { authService } from '@/backend/domains/auth/auth.service';
import {
  ContactDto,
  CreateContactDto,
  UpdateContactDto,
} from '@/types/contact.dto';
import { UserRole } from '@/types/user.dto';
import { contactsRepository } from './contact.repository';

/**
 * Interface for the contacts service
 * Provides methods for managing contacts with proper authorization
 */
interface IContactsService {
  /**
   * Creates a new contact
   * @param data - The data to create the contact with
   * @returns The created contact
   * @throws Error if not authorized or if creation fails
   */
  create(data: CreateContactDto): Promise<ContactDto>;

  /**
   * Gets a contact by ID
   * @param id - The ID of the contact to get
   * @returns The contact or null if not found
   * @throws Error if not authorized
   */
  get(id: string): Promise<ContactDto | null>;

  /**
   * Gets all contacts
   * @returns An array of contacts (empty array if none found)
   * @throws Error if not authorized
   */
  getAll(): Promise<ContactDto[]>;

  /**
   * Gets all contacts for a customer
   * @param customerId - The ID of the customer to get contacts for
   * @returns An array of contacts (empty array if none found)
   * @throws Error if not authorized
   */
  getAllForCustomer(customerId: string): Promise<ContactDto[]>;

  /**
   * Updates a contact
   * @param data - The data to update the contact with
   * @returns The updated contact
   * @throws Error if not authorized, if contact not found, or if update fails
   */
  update(data: UpdateContactDto): Promise<ContactDto>;

  /**
   * Deletes a contact
   * @param id - The ID of the contact to delete
   * @throws Error if not authorized, if contact not found, or if deletion fails
   */
  delete(id: string): Promise<void>;
}

export const contactsService: IContactsService = {
  async create(data) {
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);
    return contactsRepository.create(data);
  },

  async get(id) {
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);
    return contactsRepository.findById(id);
  },

  async getAll() {
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);
    return contactsRepository.findAll();
  },

  async getAllForCustomer(customerId) {
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);
    return contactsRepository.findAllForCustomer(customerId);
  },

  async update(data) {
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);
    const contact = await this.get(data.id);
    if (!contact) {
      throw new Error(`Contact with ID ${data.id} not found`);
    }
    return contactsRepository.update(data.id, data);
  },

  async delete(id) {
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);
    const contact = await this.get(id);
    if (!contact) {
      throw new Error(`Contact with ID ${id} not found`);
    }
    await contactsRepository.delete(id);
  },
};
