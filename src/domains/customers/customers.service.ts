import { Customer, Prisma } from '@prisma/client';
import { prisma } from '../../../prisma/prisma';

export const createCustomer = async (customer: Prisma.CustomerCreateInput) => {
  const newCustomer = await prisma.customer.create({
    data: customer,
  });
  return newCustomer;
};

export const getCustomers = async () => {
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return customers;
};

export const getCustomer = async (id: Customer['id']) => {
  const customer = await prisma.customer.findUnique({
    where: { id },
  });
  return customer;
};

export const getCustomerWithRelations = async (id: Customer['id']) => {
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      devices: true,
      contacts: true,
    },
  });
  return customer;
};

export const updateCustomer = async (
  id: Customer['id'],
  customer: Prisma.CustomerUpdateInput,
) => {
  const updatedCustomer = await prisma.customer.update({
    where: { id },
    data: customer,
  });
  return updatedCustomer;
};

export const deleteCustomer = async (id: Customer['id']) => {
  await prisma.customer.delete({
    where: { id },
  });
};
