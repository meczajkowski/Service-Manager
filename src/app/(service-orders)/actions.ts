'use server';

import { getCurrentUser } from '@/auth';
import { routes } from '@/routes';
import { getDevice } from '@/services/devices.service';
import { serviceOrders } from '@/services/service-orders.service';
import { users } from '@/services/users.service';
import { ServiceStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

type CreateServiceOrderProps = {
  deviceId: string;
  troubleDescription: string;
  assignedToId: string;
  status: ServiceStatus;
};

type GetServiceOrdersProps = {
  withRelations?: boolean;
};

type GetServiceOrderProps = {
  id: string;
  withRelations?: boolean;
};

type UpdateServiceOrderProps = {
  serviceOrderId: string;
  troubleDescription: string;
  assignedToId: string;
  status: ServiceStatus;
};

export const createServiceOrderAction = async ({
  deviceId,
  troubleDescription,
  assignedToId,
  status,
}: CreateServiceOrderProps) => {
  // get user data from session
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const device = await getDevice(deviceId);

  if (!device) {
    throw new Error('Device not found');
  }

  // not sure if needed if we have the user in the session
  const dbUser = await users.get(user.id);
  if (!dbUser) {
    throw new Error('User not found in database');
  }

  const newServiceOrder = await serviceOrders.create({
    device: {
      connect: {
        id: deviceId,
      },
    },
    troubleDescription,
    assignedTo: {
      connect: { id: assignedToId },
    },
    status,
  });

  revalidatePath(routes.serviceOrders.list);
  return newServiceOrder;
};

export const getServiceOrdersAction = async ({
  withRelations = false,
}: GetServiceOrdersProps) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  if (withRelations) {
    return await serviceOrders.getAll({ withRelations });
  }

  return await serviceOrders.getAll();
};

export const getServiceOrderAction = async ({
  id,
  withRelations = false,
}: GetServiceOrderProps) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  return await serviceOrders.get({ id, withRelations });
};

export const updateServiceOrderAction = async ({
  serviceOrderId,
  troubleDescription,
  assignedToId,
  status,
}: UpdateServiceOrderProps) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const serviceOrder = await serviceOrders.get({ id: serviceOrderId });
  if (!serviceOrder) {
    throw new Error('Service order not found');
  }

  const updatedServiceOrder = await serviceOrders.update({
    serviceOrderId,
    troubleDescription,
    assignedToId,
    status,
  });

  revalidatePath(routes.serviceOrders.list);
  return updatedServiceOrder;
};
