/**
 * Devices Service
 *
 * This module provides service operations for managing devices.
 * It includes functions for creating, updating, and retrieving devices
 * with their associated customers.
 *
 * This module is used by the devices actions to perform service operations.
 * Only the devices actions should use this module.
 * This module is the only module that should be used to perform service operations on devices.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/backend/domains/devices
 */

import {
  CreateDeviceDto,
  DeviceDto,
  DeviceWithRelationsDto,
  UpdateDeviceDto,
} from '@/types/device.dto';
import { UserRole } from '@/types/user.dto';
import { authService } from '../auth/auth.service';
import { deviceRepository } from './device.repository';

/**
 * Interface for the devices service
 * Provides methods for managing devices with proper authorization
 */
interface IDevicesService {
  /**
   * Creates a new device
   * @param data - The data to create the device with
   * @returns The created device
   * @throws Error if not authorized or if creation fails
   */
  create(data: CreateDeviceDto): Promise<DeviceDto>;

  /**
   * Gets a device by ID
   * @param id - The ID of the device to get
   * @returns The device or null if not found
   * @throws Error if not authorized
   */
  get(id: string): Promise<DeviceDto | null>;

  /**
   * Gets a device by ID with relations
   * @param id - The ID of the device to get
   * @returns The device with relations or null if not found
   * @throws Error if not authorized
   */
  getWithRelations(id: string): Promise<DeviceWithRelationsDto | null>;

  /**
   * Gets a device by serial number
   * @param serialNumber - The serial number of the device to get
   * @returns The device or null if not found
   * @throws Error if not authorized
   */
  getBySerialNumber(serialNumber: string): Promise<DeviceDto | null>;

  /**
   * Gets all devices
   * @returns An array of devices (empty array if none found)
   * @throws Error if not authorized
   */
  getAll(): Promise<DeviceDto[]>;

  /**
   * Updates a device
   * @param data - The data to update the device with
   * @returns The updated device
   * @throws Error if not authorized, if device not found, or if update fails
   */
  update(data: UpdateDeviceDto): Promise<DeviceDto>;

  /**
   * Deletes a device
   * @param id - The ID of the device to delete
   * @throws Error if not authorized, if device not found, or if deletion fails
   */
  delete(id: string): Promise<void>;
}

export const devicesService: IDevicesService = {
  async create(data) {
    await authService.requireAnyRole([UserRole.ADMIN]);
    return deviceRepository.create(data);
  },

  async get(id) {
    await authService.requireAuth();
    return deviceRepository.findById(id);
  },

  async getWithRelations(id) {
    await authService.requireAuth();
    return deviceRepository.findByIdWithRelations(id);
  },

  async getBySerialNumber(serialNumber) {
    await authService.requireAuth();
    return deviceRepository.findBySerialNumber(serialNumber);
  },

  async getAll() {
    await authService.requireAuth();
    return deviceRepository.findAll();
  },

  async update(data) {
    await authService.requireAnyRole([UserRole.ADMIN]);
    const device = await this.get(data.id);
    if (!device) {
      throw new Error(`Device with ID ${data.id} not found`);
    }
    return deviceRepository.update(data.id, data);
  },

  async delete(id) {
    await authService.requireAnyRole([UserRole.ADMIN]);
    const device = await this.get(id);
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
    await deviceRepository.delete(id);
  },
};
