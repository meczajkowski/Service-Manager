/**
 * Users Repository
 *
 * This module provides repository operations for managing users.
 * It includes functions for retrieving and updating users.
 *
 * This module is used by the users service and auth service to perform repository operations.
 * Only these services should use this module.
 * This module is the only module that should be used to perform repository operations on users.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/backend/domains/users
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
   * @returns An array of users (empty array if none found)
   */
  findAll(): Promise<UserDto[] | []>;

  /**
   * Updates a user
   * @param id - The ID of the user to update
   * @param data - The data to update the user with
   * @returns The updated user
   * @throws Error if update fails
   */
  update(id: string, data: UpdateUserDto): Promise<UserDto>;
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

      if (users.length === 0) {
        return [];
      }

      return users.map((user) => fromPrismaToUserDto(user));
    }, 'Failed to find all users');
  },

  async update(id, data) {
    return executeRepositoryOperation(async () => {
      const user = await prisma.user.update({
        where: { id },
        data,
      });

      return fromPrismaToUserDto(user);
    }, `Failed to update user with ID ${id}`);
  },
};
