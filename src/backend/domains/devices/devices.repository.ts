/**
 * Devices Repository
 *
 * This module provides repository operations for managing devices.
 * It includes functions for creating, updating, and retrieving devices
 * with their associated customers.
 *
 * This module is used by the devices service to perform repository operations.
 * Only the devices service should use this module.
 * This module is the only module that should be used to perform repository operations on devices.
 * Every method should only accept DTOs and return DTOs.
 *
 * @module src/backend/domains/devices
 */

import { executeRepositoryOperation } from '@/backend/common/helpers/repository.helper';
import { IBaseRepository } from '@/backend/common/interfaces/repository.interface';
import {
  fromPrismaToDeviceDto,
  fromPrismaToDeviceWithRelationsDto,
} from '@/backend/common/mappers/device.mapper';
import {
  CreateDeviceDto,
  DeviceDto,
  DeviceWithRelationsDto,
  UpdateDeviceDto,
} from '@/types/device.dto';
import { type PrismaClient } from '@prisma/client';

/**
 * Interface for the devices repository
 * Extends the base repository interface with device-specific methods
 */
export interface IDevicesRepository
  extends IBaseRepository<DeviceDto, CreateDeviceDto, UpdateDeviceDto> {
  /**
   * Finds a device by serial number
   * @param serialNumber - The serial number of the device to find
   * @returns The device or null if not found
   */
  findBySerialNumber(serialNumber: string): Promise<DeviceDto | null>;

  /**
   * Finds a device by ID with relations
   * @param id - The ID of the device to find
   * @returns The device with relations or null if not found
   */
  findByIdWithRelations(id: string): Promise<DeviceWithRelationsDto | null>;
}

/**
 * Devices repository implementation
 */
export class DevicesRepository implements IDevicesRepository {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: CreateDeviceDto): Promise<DeviceDto> {
    return executeRepositoryOperation(async () => {
      const device = await this.prisma.device.create({
        data,
      });
      return fromPrismaToDeviceDto(device);
    }, 'Failed to create device');
  }

  async findById(id: string): Promise<DeviceDto | null> {
    return executeRepositoryOperation(async () => {
      const device = await this.prisma.device.findUnique({
        where: { id },
      });

      if (!device) {
        return null;
      }

      return fromPrismaToDeviceDto(device);
    }, `Failed to find device with ID ${id}`);
  }

  async findByIdWithRelations(
    id: string,
  ): Promise<DeviceWithRelationsDto | null> {
    return executeRepositoryOperation(async () => {
      const device = await this.prisma.device.findUnique({
        where: { id },
        include: {
          customer: true,
        },
      });

      if (!device) {
        return null;
      }

      return fromPrismaToDeviceWithRelationsDto(device);
    }, `Failed to find device with relations with ID ${id}`);
  }

  async findBySerialNumber(serialNumber: string): Promise<DeviceDto | null> {
    return executeRepositoryOperation(async () => {
      const device = await this.prisma.device.findUnique({
        where: { serialNumber },
      });

      if (!device) {
        return null;
      }

      return fromPrismaToDeviceDto(device);
    }, `Failed to find device with serial number ${serialNumber}`);
  }

  async findAll(): Promise<DeviceDto[]> {
    return executeRepositoryOperation(async () => {
      const devices = await this.prisma.device.findMany();

      if (devices.length === 0) {
        return [];
      }

      return devices.map((device) => fromPrismaToDeviceDto(device));
    }, 'Failed to find all devices');
  }

  async update(id: string, data: UpdateDeviceDto): Promise<DeviceDto> {
    return executeRepositoryOperation(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...updateData } = data;
      const device = await this.prisma.device.update({
        where: { id },
        data: updateData,
      });

      return fromPrismaToDeviceDto(device);
    }, `Failed to update device with ID ${id}`);
  }

  async delete(id: string): Promise<void> {
    return executeRepositoryOperation(async () => {
      await this.prisma.device.delete({
        where: { id },
      });
    }, `Failed to delete device with ID ${id}`);
  }
}
