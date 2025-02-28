'use server';

import { devicesService } from '@/backend/domains/devices/device.service';
import { executeAction } from '@/lib/actions';
import { routes } from '@/routes';
import { CreateDeviceDto, UpdateDeviceDto } from '@/types/device.dto';

export const createDeviceAction = async (data: CreateDeviceDto) => {
  return executeAction({
    fn: () => devicesService.create(data),
    options: {
      errorMessage: 'Failed to create device',
      revalidatePaths: [routes.devices.list],
    },
  });
};

export const getDevicesAction = async () => {
  return executeAction({
    fn: () => devicesService.getAll(),
    options: {
      errorMessage: 'Failed to get devices',
    },
  });
};

export const getDeviceAction = async (id: string) => {
  return executeAction({
    fn: () => devicesService.get(id),
    options: {
      errorMessage: 'Failed to get device',
    },
  });
};

export const getDeviceBySerialNumberAction = async (serialNumber: string) => {
  return executeAction({
    fn: () => devicesService.getBySerialNumber(serialNumber),
    options: {
      errorMessage: 'Failed to get device by serial number',
    },
  });
};

export const updateDeviceAction = async (data: UpdateDeviceDto) => {
  return executeAction({
    fn: () => devicesService.update(data),
    options: {
      errorMessage: 'Failed to update device',
      revalidatePaths: [routes.devices.list, routes.devices.view(data.id)],
    },
  });
};

export const deleteDeviceAction = async (id: string) => {
  return executeAction({
    fn: () => devicesService.delete(id),
    options: {
      errorMessage: 'Failed to delete device',
      revalidatePaths: [routes.devices.list],
    },
  });
};
