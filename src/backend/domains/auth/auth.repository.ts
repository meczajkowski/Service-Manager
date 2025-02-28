/**
 * Auth Repository
 *
 * This module provides repository operations for managing authentication.
 * It includes functions for finding users by id and email.
 *
 * This module is used by the auth service to perform repository operations.
 * Only the auth service should use this module.
 * This module is the only module that should be used to perform repository operations on authentication.
 * Every method should only accept DTOs and return DTOs.
 *
 *
 * @module src/repositories/auth
 */

import { fromPrismaToUserDto } from '@/backend/common/mappers/user.mapper';
import { UpdateUserDto, UserDto } from '@/types/user.dto';
import { prisma } from '../../../lib/prisma';

interface IAuthRepository {
  findUserById(id: string): Promise<UserDto>;
  findUserByEmail(email: string): Promise<UserDto>;
  updateUser(id: string, data: UpdateUserDto): Promise<UserDto>;
}

export const authRepository: IAuthRepository = {
  async findUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return fromPrismaToUserDto(user);
  },

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return fromPrismaToUserDto(user);
  },

  async updateUser(id: string, data: UpdateUserDto) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return fromPrismaToUserDto(user);
  },
};
