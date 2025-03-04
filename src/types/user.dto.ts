import { ServiceOrderDto } from './service-order.dto';

export interface UserDto {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateUserDto {
  image?: string;
  role?: UserRole;
  name?: string;
  email?: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  role: UserRole;
  image?: string;
}

export interface UserWithRelationsDto extends UserDto {
  serviceOrders: ServiceOrderDto[];
}

export enum UserRole {
  ADMIN = 'ADMIN',
  TECHNICIAN = 'TECHNICIAN',
}
