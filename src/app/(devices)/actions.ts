'use server';

import { addDevice, getDevices } from '@/services/devices.service';
import { DevicePayload } from './types';

export const addDeviceAction = async (device: DevicePayload) => {
  const newDevice = await addDevice(device);
  return newDevice;
};

export const getDevicesAction = async () => {
  const devices = await getDevices();
  return devices;
};
