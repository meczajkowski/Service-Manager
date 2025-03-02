/**
 * Auth Service
 *
 * This module provides service operations for managing authentication.
 * It includes functions for retrieving the current user, requiring authentication,
 * checking user roles, and updating user profiles.
 *
 * This module is used by various actions and services to perform authentication operations.
 * This module is the only module that should be used to perform authentication operations.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/backend/domains/auth
 */

import { IUsersRepository } from '@/backend/domains/users/user.repository';
import { auth } from '@/lib/auth';
import { UpdateUserDto, UserDto, UserRole } from '@/types/user.dto';

/**
 * Interface for the auth service
 */
export interface IAuthService {
  /**
   * Gets the current authenticated user
   * @returns The current user or null if not authenticated
   */
  getCurrentUser(): Promise<UserDto | null>;

  /**
   * Requires authentication and returns the current user
   * @returns The current user
   * @throws Error if not authenticated
   */
  requireAuth(): Promise<UserDto>;

  /**
   * Requires the current user to have one of the specified roles
   * @param roles - The roles to check
   * @returns The current user
   * @throws Error if not authenticated or doesn't have required role
   */
  requireAnyRole(roles: UserRole[]): Promise<UserDto>;

  /**
   * Updates a user's profile
   * @param userId - The ID of the user to update
   * @param data - The data to update the user with
   * @returns The updated user
   * @throws Error if not authenticated, not authorized, or user not found
   */
  updateUser(userId: string, data: UpdateUserDto): Promise<UserDto>;
}

/**
 * Auth service implementation
 */
export class AuthService implements IAuthService {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async getCurrentUser(): Promise<UserDto | null> {
    try {
      const session = await auth();
      if (!session || !session.user || !session.user.email) {
        return null;
      }

      const user = await this.usersRepository.findByEmail(session.user.email);
      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async requireAuth(): Promise<UserDto> {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('Not authenticated');
    }
    return user;
  }

  async requireAnyRole(roles: UserRole[]): Promise<UserDto> {
    const user = await this.requireAuth();
    if (!roles.includes(user.role)) {
      throw new Error(`Required role: ${roles.join(' or ')}`);
    }
    return user;
  }

  async updateUser(userId: string, data: UpdateUserDto): Promise<UserDto> {
    const currentUser = await this.requireAuth();

    if (currentUser.id !== userId && currentUser.role !== UserRole.ADMIN) {
      throw new Error('Not authorized to update this user');
    }

    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return this.usersRepository.update(userId, data);
  }
}
