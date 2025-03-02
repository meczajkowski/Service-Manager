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
import { IAuthService } from '../auth/auth.service';
import { IDevicesRepository } from './devices.repository';

/**
 * Interface for the devices service
 * Provides methods for managing devices with proper authorization
 */
export interface IDevicesService {
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

  /**
   * Checks if a device exists
   * @param id - The ID of the device to check
   * @returns True if the device exists, false otherwise
   */
  checkDeviceExists(id: string): Promise<boolean>;
}

/**
 * Devices service implementation
 */
export class DevicesService implements IDevicesService {
  private devicesRepository: IDevicesRepository;
  private authService: IAuthService;

  constructor(
    devicesRepository: IDevicesRepository,
    authService: IAuthService,
  ) {
    this.devicesRepository = devicesRepository;
    this.authService = authService;
  }

  async create(data: CreateDeviceDto): Promise<DeviceDto> {
    await this.authService.requireAnyRole([UserRole.ADMIN]);
    return this.devicesRepository.create(data);
  }

  async get(id: string): Promise<DeviceDto | null> {
    await this.authService.requireAuth();
    return this.devicesRepository.findById(id);
  }

  async getWithRelations(id: string): Promise<DeviceWithRelationsDto | null> {
    await this.authService.requireAuth();
    return this.devicesRepository.findByIdWithRelations(id);
  }

  async getBySerialNumber(serialNumber: string): Promise<DeviceDto | null> {
    await this.authService.requireAuth();
    return this.devicesRepository.findBySerialNumber(serialNumber);
  }

  async getAll(): Promise<DeviceDto[]> {
    await this.authService.requireAuth();
    return this.devicesRepository.findAll();
  }

  async update(data: UpdateDeviceDto): Promise<DeviceDto> {
    await this.authService.requireAnyRole([UserRole.ADMIN]);
    const device = await this.get(data.id);
    if (!device) {
      throw new Error(`Device with ID ${data.id} not found`);
    }
    return this.devicesRepository.update(data.id, data);
  }

  async delete(id: string): Promise<void> {
    await this.authService.requireAnyRole([UserRole.ADMIN]);
    const device = await this.get(id);
    if (!device) {
      throw new Error(`Device with ID ${id} not found`);
    }
    await this.devicesRepository.delete(id);
  }

  async checkDeviceExists(id: string): Promise<boolean> {
    const device = await this.devicesRepository.findById(id);
    return device !== null;
  }
}
