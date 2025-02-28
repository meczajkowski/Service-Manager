import {
  CreateDeviceDto,
  DeviceDto,
  UpdateDeviceDto,
} from '@/types/device.dto';
import { UserRole } from '@/types/user.dto';
import { authService } from '../auth/auth.service';
import { deviceRepository } from './device.repository';

interface IDevicesService {
  create(data: CreateDeviceDto): Promise<DeviceDto>;
  get(id: string): Promise<DeviceDto>;
  getBySerialNumber(serialNumber: string): Promise<DeviceDto>;
  getAll(): Promise<DeviceDto[]>;
  update(data: UpdateDeviceDto): Promise<DeviceDto>;
  delete(id: string): Promise<void>;
}

export const devicesService: IDevicesService = {
  async create(data) {
    await authService.requireAnyRole([UserRole.ADMIN]);
    const newDevice = await deviceRepository.create(data);
    return newDevice;
  },

  async get(id) {
    await authService.requireAuth();
    const device = await deviceRepository.get(id);
    return device;
  },

  async getBySerialNumber(serialNumber) {
    await authService.requireAuth();
    const device = await deviceRepository.getBySerialNumber(serialNumber);
    return device;
  },

  async getAll() {
    await authService.requireAuth();
    const devices = await deviceRepository.getAll();
    return devices;
  },

  async update(data) {
    await authService.requireAnyRole([UserRole.ADMIN]);
    const updatedDevice = await deviceRepository.update(data);
    return updatedDevice;
  },

  async delete(id) {
    await authService.requireAnyRole([UserRole.ADMIN]);
    await deviceRepository.delete(id);
  },
};
