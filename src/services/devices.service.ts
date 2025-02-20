import { Device, Prisma } from '@prisma/client';
import { prisma } from '../../prisma/prisma';

export const addDevice = async (device: Prisma.DeviceCreateInput) => {
  const newDevice = await prisma.device.create({
    data: device,
  });
  return newDevice;
};

export const getDevices = async () => {
  const devices = await prisma.device.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return devices;
};

export const getDeviceWithRelations = async (id: Device['id']) => {
  const device = await prisma.device.findUnique({
    where: { id },
    include: {
      customer: true,
      contacts: true,
      serviceOrders: true,
    },
  });
  return device;
};

export const getDevice = async (id: Device['id']) => {
  const device = await prisma.device.findUnique({
    where: { id },
  });
  return device;
};

export const getDeviceBySerialNumber = async (
  serialNumber: Device['serialNumber'],
) => {
  const device = await prisma.device.findUnique({
    where: { serialNumber },
  });
  return device;
};

export const updateDevice = async (
  id: Device['id'],
  device: Prisma.DeviceUpdateInput,
) => {
  const updatedDevice = await prisma.device.update({
    where: { id },
    data: device,
  });
  return updatedDevice;
};

export const deleteDevice = async (id: Device['id']) => {
  const deletedDevice = await prisma.device.delete({
    where: { id },
  });
  return deletedDevice;
};
