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
 * @module src/services/contacts
 */

import { authService } from '@/backend/domains/auth/auth.service';
import {
  ContactDto,
  CreateContactDto,
  UpdateContactDto,
} from '@/types/contact.dto';
import { UserRole } from '@/types/user.dto';
import { contactsRepository } from './contact.repository';

interface IContactsService {
  create(data: CreateContactDto): Promise<ContactDto>;
  get(id: string): Promise<ContactDto | null>;
  getAll(): Promise<ContactDto[]>;
  getAllForCustomer(customerId: string): Promise<ContactDto[]>;
  update(data: UpdateContactDto): Promise<ContactDto>;
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
    return contactsRepository.update(data.id, data);
  },

  async delete(id) {
    await authService.requireAnyRole([UserRole.ADMIN, UserRole.TECHNICIAN]);
    await contactsRepository.delete(id);
  },
};
