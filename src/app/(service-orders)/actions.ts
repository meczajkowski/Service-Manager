'use server';

import { serviceOrders } from '@/backend/service-orders/service-order.service';
import { routes } from '@/routes';
import {
  CreateServiceOrderDto,
  ServiceOrderWithRelationsDto,
  UpdateServiceOrderDto,
} from '@/types/service-order.dto';
import { revalidatePath } from 'next/cache';

type ServiceOptions = {
  errorMessage: string;
  revalidatePaths?: string[];
};

async function executeService<T>(
  fn: () => Promise<T>,
  options: ServiceOptions,
) {
  try {
    const data = await fn();
    options.revalidatePaths?.forEach((path) => revalidatePath(path));
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : options.errorMessage,
    };
  }
}

// Actions
export const createServiceOrderAction = (data: CreateServiceOrderDto) => {
  return executeService(() => serviceOrders.create(data), {
    errorMessage: 'Failed to create service order',
    revalidatePaths: [routes.serviceOrders.list],
  });
};

export const getServiceOrdersAction = () => {
  return executeService(() => serviceOrders.getAll(), {
    errorMessage: 'Failed to get service orders',
  });
};

export const getServiceOrdersWithRelationsAction = () => {
  return executeService(() => serviceOrders.getAllWithRelations(), {
    errorMessage: 'Failed to get service orders with relations',
  });
};

export const getServiceOrderWithRelationsAction = async (
  id: ServiceOrderWithRelationsDto['id'],
) => {
  return executeService(() => serviceOrders.getWithRelations(id), {
    errorMessage: 'Failed to get service order with relations',
  });
};

export const getServiceOrderAction = (id: string) => {
  return executeService(() => serviceOrders.get(id), {
    errorMessage: 'Failed to get service order',
  });
};

export const updateServiceOrderAction = (data: UpdateServiceOrderDto) => {
  return executeService(() => serviceOrders.update(data), {
    errorMessage: 'Failed to update service order',
    revalidatePaths: [routes.serviceOrders.list],
  });
};
