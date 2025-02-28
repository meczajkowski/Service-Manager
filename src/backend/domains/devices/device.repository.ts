import { fromPrismaToDeviceDto } from '@/backend/common/mappers/device.mapper';
import { prisma } from '@/lib/prisma';
import {
  CreateDeviceDto,
  DeviceDto,
  UpdateDeviceDto,
} from '@/types/device.dto';

interface IDeviceRepository {
  getAll: () => Promise<DeviceDto[]>;
  get: (id: string) => Promise<DeviceDto>;
  getBySerialNumber: (serialNumber: string) => Promise<DeviceDto>;
  create: (data: CreateDeviceDto) => Promise<DeviceDto>;
  update: (data: UpdateDeviceDto) => Promise<DeviceDto>;
  delete: (id: string) => Promise<void>;
}

export const deviceRepository: IDeviceRepository = {
  getAll: async () => {
    const devices = await prisma.device.findMany();
    return devices.map(fromPrismaToDeviceDto);
  },

  get: async (id: string) => {
    const device = await prisma.device.findUnique({
      where: { id },
    });
    if (!device) {
      throw new Error('Device not found');
    }
    return fromPrismaToDeviceDto(device);
  },

  getBySerialNumber: async (serialNumber: string) => {
    const device = await prisma.device.findUnique({
      where: { serialNumber },
    });
    if (!device) {
      throw new Error('Device not found');
    }
    return fromPrismaToDeviceDto(device);
  },

  create: async (data: CreateDeviceDto) => {
    const newDevice = await prisma.device.create({
      data: data,
    });
    return fromPrismaToDeviceDto(newDevice);
  },

  update: async (data: UpdateDeviceDto) => {
    const updatedDevice = await prisma.device.update({
      where: { id: data.id },
      data: data,
    });
    return fromPrismaToDeviceDto(updatedDevice);
  },

  delete: async (id: string) => {
    await prisma.device.delete({
      where: { id },
    });
  },
};
