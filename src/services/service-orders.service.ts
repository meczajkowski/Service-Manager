import { Prisma } from '@prisma/client';
import { prisma } from '../../prisma/prisma';

export const serviceOrders = {
  create: async (serviceOrder: Prisma.ServiceOrderCreateInput) => {
    return await prisma.serviceOrder.create({
      data: serviceOrder,
    });
  },

  get: async ({
    id,
    withRelations = false,
  }: {
    id: string;
    withRelations?: boolean;
  }) => {
    if (withRelations) {
      return await prisma.serviceOrder.findUnique({
        where: { id },
        include: {
          device: { include: { customer: true } },
          assignedTo: true,
        },
      });
    }

    return await prisma.serviceOrder.findUnique({
      where: { id },
    });
  },

  getAll: async ({
    withRelations = false,
  }: { withRelations?: boolean } = {}) => {
    if (withRelations) {
      return await prisma.serviceOrder.findMany({
        include: {
          device: { include: { customer: true } },
          assignedTo: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    return await prisma.serviceOrder.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  // get: (id: string) => {
  //   const withoutRelations = async () => {
  //     return await prisma.serviceOrder.findUnique({
  //       where: { id },
  //     });
  //   };

  //   return Object.assign(withoutRelations, {
  //     withRelations: async () => {
  //       return await prisma.serviceOrder.findUnique({
  //         where: { id },
  //         include: {
  //           device: {
  //             include: {
  //               customer: true,
  //             },
  //           },
  //           assignedTo: true,
  //         },
  //       });
  //     },
  //   });
  // },

  // getAll: async () => {
  //   const withoutRelations = async () => {
  //     return await prisma.serviceOrder.findMany({
  //       orderBy: {
  //         createdAt: 'desc',
  //       },
  //     });
  //   };

  //   return Object.assign(withoutRelations, {
  //     withRelations: async () => {
  //       return await prisma.serviceOrder.findMany({
  //         include: {
  //           device: {
  //             include: {
  //               customer: true,
  //             },
  //           },
  //           assignedTo: true,
  //         },
  //         orderBy: {
  //           createdAt: 'desc',
  //         },
  //       });
  //     },
  //   });
  // },
};
