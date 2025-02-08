'use server';

import { addDevice } from '@/services/devices.service';
import { DevicePayload } from './types';

export const addDeviceAction = async (device: DevicePayload) => {
  const newDevice = await addDevice(device);
  return newDevice;
};
