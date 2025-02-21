/**
 * Auth Database Operations
 *
 * This module provides database operations for managing authentication.
 * It includes functions for finding users by id and email.
 *
 * This module is used by the auth service to perform database operations.
 * Only the auth service should use this module.
 * This module is the only module that should be used to perform database operations on authentication.
 * Every method should only accept DTOs and return DTOs.
 *
 *
 * @module src/db/auth
 */

import { UpdateUserDto, UserDto, UserRole } from '@/types/user.dto';
import { User } from '@prisma/client';
import { prisma } from '../../prisma/prisma';

interface AuthDb {
  findUserById(id: string): Promise<UserDto>;
  findUserByEmail(email: string): Promise<UserDto>;
  updateUser(id: string, data: UpdateUserDto): Promise<UserDto>;
}

const fromPrismaToDto = (user: User): UserDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  image: user.image,
  role: user.role as UserRole,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const authDb: AuthDb = {
  async findUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return fromPrismaToDto(user);
  },

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return fromPrismaToDto(user);
  },

  async updateUser(id: string, data: UpdateUserDto) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return fromPrismaToDto(user);
  },
};
