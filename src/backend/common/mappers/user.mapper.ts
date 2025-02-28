/**
 * User Mappers
 *
 * This module provides functions for mapping between Prisma User entities and DTOs.
 * Mappers should only be used when we are sure the entity exists.
 */

import { UserDto, UserRole } from '@/types/user.dto';
import { User } from '@prisma/client';

/**
 * Maps a Prisma User entity to a UserDto
 * @param user - The Prisma User entity to map
 * @returns A UserDto object
 */
export const fromPrismaToUserDto = (user: User): UserDto => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role as UserRole,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
