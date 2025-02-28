/**
 * Customer Mappers
 *
 * This module provides functions for mapping between Prisma Customer entities and DTOs.
 */

import { CustomerDto } from '@/types/customer.dto';
import { Customer } from '@prisma/client';

/**
 * Maps a Prisma Customer entity to a CustomerDto
 */
export const fromPrismaToCustomerDto = (
  customer: Customer | null,
): CustomerDto | null => {
  if (!customer) return null;
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
