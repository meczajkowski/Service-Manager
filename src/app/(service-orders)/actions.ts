'use server';

import {
  ServiceOrderDetailsViewModel,
  ServiceOrderTableViewModel,
} from '@/backend/domains/service-orders/service-orders.service';
import { serviceOrdersService } from '@/backend/services';
import { executeAction } from '@/lib/actions';
import { routes } from '@/routes';
import {
  CreateServiceOrderDto,
  ServiceOrderDto,
  ServiceOrderWithRelationsDto,
  UpdateServiceOrderDto,
} from '@/types/service-order.dto';

// Actions
export const createServiceOrderAction = (data: CreateServiceOrderDto) => {
  return executeAction({
    fn: () => serviceOrdersService.create(data),
    options: {
      errorMessage: 'Failed to create service order',
      revalidatePaths: [routes.serviceOrders.list],
    },
  });
};

export const getServiceOrdersAction = (): Promise<ServiceOrderDto[]> => {
  return executeAction({
    fn: () => serviceOrdersService.getAll(),
    options: {
      errorMessage: 'Failed to get service orders',
    },
  });
};

export const getServiceOrdersTableDataAction = (): Promise<
  ServiceOrderTableViewModel[]
> => {
  return executeAction({
    fn: () => serviceOrdersService.getAllForTable(),
    options: {
      errorMessage: 'Failed to get service orders table data',
    },
  });
};

export const getServiceOrderAction = (
  id: string,
): Promise<ServiceOrderDto | null> => {
  return executeAction({
    fn: () => serviceOrdersService.get(id),
    options: {
      errorMessage: 'Failed to get service order',
    },
  });
};

export const getServiceOrderWithRelationsAction = (
  id: string,
): Promise<ServiceOrderWithRelationsDto | null> => {
  return executeAction({
    fn: () => serviceOrdersService.getWithRelations(id),
    options: {
      errorMessage: 'Failed to get service order with relations',
    },
  });
};

export const getServiceOrderDetailsAction = (
  id: string,
): Promise<ServiceOrderDetailsViewModel | null> => {
  return executeAction({
    fn: () => serviceOrdersService.getDetails(id),
    options: {
      errorMessage: 'Failed to get service order details',
    },
  });
};

export const updateServiceOrderAction = (data: UpdateServiceOrderDto) => {
  return executeAction({
    fn: () => serviceOrdersService.update(data.serviceOrderId, data),
    options: {
      errorMessage: 'Failed to update service order',
      revalidatePaths: [routes.serviceOrders.list],
    },
  });
};
