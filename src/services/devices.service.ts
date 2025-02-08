import { Prisma } from '@prisma/client';
import { prisma } from '../../prisma/prisma';

export const addDevice = async (device: Prisma.DeviceCreateInput) => {
  const newDevice = await prisma.device.create({
    data: device,
  });
  return newDevice;
};
