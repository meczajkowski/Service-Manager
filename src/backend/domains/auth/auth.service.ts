import { authRepository } from '@/backend/domains/auth/auth.repository';
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

    const user = await authRepository.updateUser(userId, data);
    const dto: UserDto = {
      id: user.id,
      name: user.name ?? null,
      email: user.email,
      image: user.image ?? null,
      role: user.role as UserRole,
    };

    return dto;
  },
};
