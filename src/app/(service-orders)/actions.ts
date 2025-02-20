'use server';

import { getCurrentUser } from '@/auth';
import { routes } from '@/routes';
import { getDevice } from '@/services/devices.service';
import { serviceOrders } from '@/services/service-orders.service';
import { users } from '@/services/users.service';
import { revalidatePath } from 'next/cache';

export const createServiceOrderAction = async ({
  deviceId,
  troubleDescription,
  assignedToId,
}: {
  deviceId: string;
  troubleDescription: string;
  assignedToId: string;
}) => {
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
  });

  revalidatePath(routes.serviceOrders.list);
  return newServiceOrder;
};

export const getServiceOrdersAction = async ({
  withRelations = false,
}: {
  withRelations?: boolean;
}) => {
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
}: {
  id: string;
  withRelations?: boolean;
}) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  return await serviceOrders.get({ id, withRelations });
};
