import { DeviceDto } from './device.dto';
import { UserDto } from './user.dto';

export enum ServiceOrderStatus {
  PENDING = 'PENDING',
  ISSUED = 'ISSUED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// Base DTO with common fields
interface ServiceOrderBaseDto {
  troubleDescription: string;
  assignedToId: string | null;
  status: ServiceOrderStatus;
}

// DTO for creating a service order
export interface CreateServiceOrderDto extends ServiceOrderBaseDto {
  deviceId: string;
}

// DTO for updating a service order
export interface UpdateServiceOrderDto extends ServiceOrderBaseDto {
  serviceOrderId: string;
}

// Full service order response with all relations
export interface ServiceOrderWithRelationsDto {
  id: string;
  troubleDescription: string;
  status: ServiceOrderStatus;
  device: DeviceDto;
  assignedTo: UserDto | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Basic service order response without relations
export interface ServiceOrderDto {
  id: string;
  troubleDescription: string;
  status: ServiceOrderStatus;
  deviceId: string;
  assignedToId: string | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
