'use server';

import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  getCustomerWithRelations,
  updateCustomer,
} from '@/backend/customers/customers.service';
import { routes } from '@/routes';
import { Customer } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { CustomerPayload, CustomerWithRelations } from './types';

export const createCustomerAction = async (customer: CustomerPayload) => {
  const newCustomer = await createCustomer(customer);
  revalidatePath(routes.customers.list);
  return newCustomer;
};

export const getCustomersAction = async () => {
  const customers = await getCustomers();
  return customers;
};

export const getCustomerAction = async (id: Customer['id']) => {
  const customer = await getCustomer(id);
  return customer;
};

export const getCustomerWithRelationsAction = async (
  id: Customer['id'],
): Promise<CustomerWithRelations | null> => {
  const customer = await getCustomerWithRelations(id);
  return customer;
};

export const updateCustomerAction = async (
  id: Customer['id'],
  customer: CustomerPayload,
) => {
  const updatedCustomer = await updateCustomer(id, customer);
  revalidatePath(routes.customers.list);
  return updatedCustomer;
};

export const deleteCustomerAction = async (id: Customer['id']) => {
  await deleteCustomer(id);
  revalidatePath(routes.customers.list);
};
