import { CustomerDto } from './customer.dto';
import { DeviceDto } from './device.dto';

export interface ContactDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactWithRelationsDto extends ContactDto {
  customers: CustomerDto[];
  devices: DeviceDto[];
}
