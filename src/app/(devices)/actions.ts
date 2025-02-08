'use server';

import { AppRoutes } from '@/routes';
import {
  addDevice,
  getDevices,
  updateDevice,
} from '@/services/devices.service';
import { revalidatePath } from 'next/cache';
import { DevicePayload } from './types';

export const addDeviceAction = async (device: DevicePayload) => {
  const newDevice = await addDevice(device);
  revalidatePath(AppRoutes.devices);
  return newDevice;
};

export const getDevicesAction = async () => {
  const devices = await getDevices();
  return devices;
};

export const updateDeviceAction = async (id: string, device: DevicePayload) => {
  const updatedDevice = await updateDevice(id, device);
  revalidatePath(AppRoutes.devices);
  return updatedDevice;
};
