'use server';

import { AppRoutes } from '@/routes';
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  getCustomerWithRelations,
  updateCustomer,
} from '@/services/customers.service';
import { Customer } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { CustomerPayload } from './types';

export const createCustomerAction = async (customer: CustomerPayload) => {
  const newCustomer = await createCustomer(customer);
  revalidatePath(AppRoutes.customers);
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

export const getCustomerWithRelationsAction = async (id: Customer['id']) => {
  const customer = await getCustomerWithRelations(id);
  return customer;
};

export const updateCustomerAction = async (
  id: Customer['id'],
  customer: CustomerPayload,
) => {
  const updatedCustomer = await updateCustomer(id, customer);
  revalidatePath(AppRoutes.customers);
  return updatedCustomer;
};

export const deleteCustomerAction = async (id: Customer['id']) => {
  await deleteCustomer(id);
  revalidatePath(AppRoutes.customers);
};
