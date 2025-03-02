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

import { IAuthService } from '@/backend/domains/auth/auth.service';
import { UserDto, UserRole } from '@/types/user.dto';
import { IUsersRepository } from './user.repository';

/**
 * Interface for the users service
 */
export interface IUsersService {
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

/**
 * Users service implementation
 */
export class UsersService implements IUsersService {
  private usersRepository: IUsersRepository;
  private authService: IAuthService;

  constructor(usersRepository: IUsersRepository, authService: IAuthService) {
    this.usersRepository = usersRepository;
    this.authService = authService;
  }

  async get(id: string): Promise<UserDto | null> {
    await this.authService.requireAnyRole([UserRole.ADMIN]);
    return this.usersRepository.findById(id);
  }

  async getByEmail(email: string): Promise<UserDto | null> {
    await this.authService.requireAnyRole([UserRole.ADMIN]);
    return this.usersRepository.findByEmail(email);
  }

  async getAll(): Promise<UserDto[]> {
    await this.authService.requireAnyRole([UserRole.ADMIN]);
    return this.usersRepository.findAll();
  }
}
