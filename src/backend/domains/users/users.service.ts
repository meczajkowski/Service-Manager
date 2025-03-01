/**
 * Users Service
 *
 * This module provides service operations for managing users.
 * It includes functions for retrieving users.
 *
 * This module is used by the users actions to perform service operations.
 * Only the users actions should use this module.
 * This module is the only module that should be used to perform service operations on users.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/backend/domains/users
 */

import { authService } from '@/backend/domains/auth/auth.service';
import { UserDto, UserRole } from '@/types/user.dto';
import { usersRepository } from './user.repository';

/**
 * Interface for the users service
 */
interface IUsersService {
  /**
   * Gets a user by ID
   * @param id - The ID of the user to get
   * @returns The user or null if not found
   * @throws Error if not authorized
   */
  get(id: string): Promise<UserDto | null>;

  /**
   * Gets a user by email
   * @param email - The email of the user to get
   * @returns The user or null if not found
   * @throws Error if not authorized
   */
  getByEmail(email: string): Promise<UserDto | null>;

  /**
   * Gets all users
   * @returns An array of users (empty array if none found)
   * @throws Error if not authorized
   */
  getAll(): Promise<UserDto[]>;
}

export const usersService: IUsersService = {
  async get(id) {
    await authService.requireAnyRole([UserRole.ADMIN]);
    return usersRepository.findById(id);
  },

  async getByEmail(email) {
    await authService.requireAnyRole([UserRole.ADMIN]);
    return usersRepository.findByEmail(email);
  },

  async getAll() {
    await authService.requireAnyRole([UserRole.ADMIN]);
    return usersRepository.findAll();
  },
};
