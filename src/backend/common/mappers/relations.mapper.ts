/**
 * Relations Mappers
 *
 * This module provides functions for mapping entity relations.
 * These mappers help avoid circular dependencies between entity mappers.
 */

import { ContactDto } from '@/types/contact.dto';
import { CustomerDto } from '@/types/customer.dto';
import { DeviceDto } from '@/types/device.dto';
import { Contact, Customer, Device } from '@prisma/client';
import { fromPrismaToContactDto } from './contact.mapper';
import { fromPrismaToCustomerDto } from './customer.mapper';
import { fromPrismaToDeviceDto } from './device.mapper';

/**
 * Maps customer relations for a device
 * @param customer - The Prisma Customer entity to map
 * @returns A CustomerDto object or null if customer is null
 */
export const mapCustomerRelationForDevice = (
  customer: Customer,
): CustomerDto => {
  return fromPrismaToCustomerDto(customer);
};

/**
 * Maps device relations for a customer
 * @param devices - The array of Prisma Device entities to map
 * @returns An array of DeviceDto objects
 */
export const mapDeviceRelationsForCustomer = (
  devices: Device[],
): DeviceDto[] => {
  return devices.map((device) => fromPrismaToDeviceDto(device));
};

/**
 * Maps contact relations for a customer
 * @param contacts - The array of Prisma Contact entities to map
 * @returns An array of ContactDto objects
 */
export const mapContactRelationsForCustomer = (
  contacts: Contact[],
): ContactDto[] => {
  return contacts.map((contact) => fromPrismaToContactDto(contact));
};
