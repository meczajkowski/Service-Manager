/**
 * Users Repository
 *
 * This module provides repository operations for managing users.
 * It includes functions for retrieving users.
 *
 * This module is used by the users service to perform repository operations.
 * Only the users service should use this module.
 * This module is the only module that should be used to perform repository operations on users.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/repositories/user
 */

import { executeRepositoryOperation } from '@/backend/common/helpers/repository.helper';
import { IBaseRepository } from '@/backend/common/interfaces/repository.interface';
import { fromPrismaToUserDto } from '@/backend/common/mappers/user.mapper';
import { CreateUserDto, UpdateUserDto, UserDto } from '@/types/user.dto';
import { prisma } from '../../../lib/prisma';

/**
 * Interface for the users repository
 * Extends the base repository interface with user-specific methods
 */
interface IUsersRepository
  extends Partial<IBaseRepository<UserDto, CreateUserDto, UpdateUserDto>> {
  /**
   * Finds a user by ID
   * @param id - The ID of the user to find
   * @returns The user or null if not found
   */
  findById(id: string): Promise<UserDto | null>;

  /**
   * Finds a user by email
   * @param email - The email of the user to find
   * @returns The user or null if not found
   */
  findByEmail(email: string): Promise<UserDto | null>;

  /**
   * Finds all users
   * @returns An array of users
   */
  findAll(): Promise<UserDto[]>;
}

export const usersRepository: IUsersRepository = {
  async findById(id) {
    return executeRepositoryOperation(async () => {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return null;
      }

      return fromPrismaToUserDto(user);
    }, `Failed to find user with ID ${id}`);
  },

  async findByEmail(email) {
    return executeRepositoryOperation(async () => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return null;
      }

      return fromPrismaToUserDto(user);
    }, `Failed to find user with email ${email}`);
  },

  async findAll() {
    return executeRepositoryOperation(async () => {
      const users = await prisma.user.findMany();
      return users.map((user) => fromPrismaToUserDto(user));
    }, 'Failed to find all users');
  },
};
