'use server';

import { customersService } from '@/backend/services';
import { executeAction } from '@/lib/actions';
import { routes } from '@/routes';
import { CreateCustomerDto, UpdateCustomerDto } from '@/types/customer.dto';

export const createCustomerAction = async (customer: CreateCustomerDto) => {
  return executeAction({
    fn: () => customersService.create(customer),
    options: {
      errorMessage: 'Failed to create customer',
      revalidatePaths: [routes.customers.list],
    },
  });
};

export const getCustomersAction = async () => {
  return executeAction({
    fn: () => customersService.getAll(),
    options: {
      errorMessage: 'Failed to get customers',
    },
  });
};

export const getCustomerAction = async (id: string) => {
  return executeAction({
    fn: () => customersService.get(id),
    options: {
      errorMessage: 'Failed to get customer',
    },
  });
};

export const getCustomerWithRelationsAction = async (id: string) => {
  return executeAction({
    fn: () => customersService.getWithRelations(id),
    options: {
      errorMessage: 'Failed to get customer with relations',
    },
  });
};

export const updateCustomerAction = async (data: UpdateCustomerDto) => {
  return executeAction({
    fn: () => customersService.update(data),
    options: {
      errorMessage: 'Failed to update customer',
      revalidatePaths: [routes.customers.list],
    },
  });
};

export const deleteCustomerAction = async (id: string) => {
  return executeAction({
    fn: () => customersService.delete(id),
    options: {
      errorMessage: 'Failed to delete customer',
      revalidatePaths: [routes.customers.list],
    },
  });
};
