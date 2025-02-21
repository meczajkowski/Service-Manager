import { DeviceModel } from '@prisma/client';
import { CustomerDto } from './customer.dto';

export interface DeviceDto {
  id: string;
  serialNumber: string;
  model: DeviceModel;
  customer: CustomerDto | null;
}
