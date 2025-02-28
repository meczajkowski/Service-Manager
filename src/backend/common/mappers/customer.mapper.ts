/**
 * Customer Mappers
 *
 * This module provides functions for mapping between Prisma Customer entities and DTOs.
 * Mappers should only be used when we are sure the entity exists.
 */

import { CustomerDto, CustomerWithRelationsDto } from '@/types/customer.dto';
import { Contact, Customer, Device } from '@prisma/client';
import {
  mapContactRelationsForCustomer,
  mapDeviceRelationsForCustomer,
} from './relations.mapper';

/**
 * Maps a Prisma Customer entity to a CustomerDto
 * @param customer - The Prisma Customer entity to map
 * @returns A CustomerDto object
 */
export const fromPrismaToCustomerDto = (customer: Customer): CustomerDto => {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    address: customer.address,
    phone: customer.phone,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
  };
};

/**
 * Maps a Prisma Customer entity with relations to a CustomerWithRelationsDto
 * @param customer - The Prisma Customer entity with relations to map
 * @returns A CustomerWithRelationsDto object
 */
export const fromPrismaToCustomerWithRelationsDto = (
  customer: Customer & { devices: Device[]; contacts: Contact[] },
): CustomerWithRelationsDto => {
  return {
    ...fromPrismaToCustomerDto(customer),
    devices: mapDeviceRelationsForCustomer(customer.devices),
    contacts: mapContactRelationsForCustomer(customer.contacts),
  };
};
