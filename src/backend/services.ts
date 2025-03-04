/**
 * Services Initialization
 *
 * This file initializes all services and repositories used in the application.
 * It creates instances of repositories and services, and injects dependencies.
 * This is the only place where instances of repositories and services are created.
 *
 * @module src/backend/services
 */

import { prisma } from '@/lib/prisma';
import { AuthService } from './domains/auth/auth.service';
import { ContactsRepository } from './domains/contacts/contacts.repository';
import { ContactsService } from './domains/contacts/contacts.service';
import { CustomersRepository } from './domains/customers/customers.repository';
import { CustomersService } from './domains/customers/customers.service';
import { DevicesRepository } from './domains/devices/devices.repository';
import { DevicesService } from './domains/devices/devices.service';
import { ServiceOrdersRepository } from './domains/service-orders/service-orders.repository';
import { ServiceOrdersService } from './domains/service-orders/service-orders.service';
import { UsersRepository } from './domains/users/user.repository';
import { UsersService } from './domains/users/users.service';

// Create repository instances
const usersRepository = new UsersRepository(prisma);
const contactsRepository = new ContactsRepository(prisma);
const customersRepository = new CustomersRepository(prisma);
const devicesRepository = new DevicesRepository(prisma);
const serviceOrdersRepository = new ServiceOrdersRepository(prisma);

// Create service instances with injected dependencies
export const authService = new AuthService(usersRepository);
export const usersService = new UsersService(usersRepository, authService);
export const contactsService = new ContactsService(
  contactsRepository,
  authService,
);
export const customersService = new CustomersService(
  customersRepository,
  authService,
);
export const devicesService = new DevicesService(
  devicesRepository,
  authService,
);
export const serviceOrdersService = new ServiceOrdersService(
  serviceOrdersRepository,
  devicesService,
  usersService,
  authService,
);
