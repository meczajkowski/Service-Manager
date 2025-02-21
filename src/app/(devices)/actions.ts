'use server';

import {
  addDevice,
  deleteDevice,
  getDevices,
  getDeviceWithRelations,
  updateDevice,
} from '@/domains/devices/devices.service';
import { routes } from '@/routes';
import { revalidatePath } from 'next/cache';
import { DevicePayload } from './types';

export const addDeviceAction = async (device: DevicePayload) => {
  const newDevice = await addDevice(device);
  revalidatePath(routes.devices.list);
  return newDevice;
};

export const getDevicesAction = async () => {
  const devices = await getDevices();
  return devices;
};

export const getDeviceWithRelationsAction = async (id: string) => {
  const device = await getDeviceWithRelations(id);
  return device;
};

export const updateDeviceAction = async (id: string, device: DevicePayload) => {
  const updatedDevice = await updateDevice(id, device);
  revalidatePath(routes.devices.list);
  return updatedDevice;
};

export const deleteDeviceAction = async (id: string) => {
  const deletedDevice = await deleteDevice(id);
  revalidatePath(routes.devices.list);
  return deletedDevice;
};
