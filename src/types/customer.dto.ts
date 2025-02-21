import { ContactDto } from './contact.dto';
import { DeviceDto } from './device.dto';

export interface CustomerDto {
  id: string;
  name: string;
  address: string;
  email: string | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerWithRelationsDto extends CustomerDto {
  devices: DeviceDto[];
  contacts: ContactDto[];
}
