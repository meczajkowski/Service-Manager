import { usersRepository } from '@/backend/domains/users/user.repository';
import { auth } from '@/lib/auth';
import { UpdateUserDto, UserDto, UserRole } from '@/types/user.dto';

interface IAuthService {
  getCurrentUser(): Promise<UserDto | null>;
  requireAuth(): Promise<UserDto>;
  requireAnyRole(roles: UserRole[]): Promise<UserDto>;
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
