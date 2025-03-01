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

import { usersRepository } from '@/backend/domains/users/user.repository';
import { auth } from '@/lib/auth';
import { UpdateUserDto, UserDto, UserRole } from '@/types/user.dto';

/**
 * Interface for the auth service
 */
interface IAuthService {
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

export const authService: IAuthService = {
  async getCurrentUser() {
    const session = await auth();
    if (!session?.user?.email) {
      return null;
    }

    // Try to get the user from the database to ensure we have the latest data
    try {
      const dbUser = await usersRepository.findById(session.user.id);
      if (dbUser) {
        return dbUser;
      }
    } catch (error) {
      console.error('Error fetching user from database:', error);
    }

    // Fallback to session data if database fetch fails
    const dto: UserDto = {
      id: session.user.id,
      name: session.user.name ?? null,
      email: session.user.email,
      image: session.user.image ?? null,
      role: session.user.role as UserRole,
    };

    return dto;
  },

  async requireAuth() {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user;
  },

  async requireAnyRole(roles: UserRole[]) {
    const user = await this.requireAuth();
    if (!roles.includes(user.role)) {
      throw new Error('Forbidden');
    }
    return user;
  },

  async updateUser(userId: string, data: UpdateUserDto) {
    const currentUser = await this.requireAuth();
    if (currentUser.id !== userId) {
      throw new Error('Unauthorized');
    }

    const existingUser = await usersRepository.findById(userId);
    if (!existingUser) {
      throw new Error('User not found');
    }

    return await usersRepository.update(userId, data);
  },
};
