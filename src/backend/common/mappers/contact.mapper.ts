/**
 * Contact Mappers
 *
 * This module provides functions for mapping between Prisma Contact entities and DTOs.
 * Mappers should only be used when we are sure the entity exists.
 */

import { ContactDto } from '@/types/contact.dto';
import { Contact } from '@prisma/client';

/**
 * Maps a Prisma Contact entity to a ContactDto
 * @param contact - The Prisma Contact entity to map
 * @returns A ContactDto object
 */
export const fromPrismaToContactDto = (contact: Contact): ContactDto => {
  return {
    id: contact.id,
    name: contact.name || '',
    email: contact.email || '',
    phone: contact.phone || '',
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
  };
};
