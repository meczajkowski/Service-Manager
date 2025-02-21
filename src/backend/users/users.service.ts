import { prisma } from '../../lib/prisma';

export const users = {
  getByEmail: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  },
  getAll: async () => {
    const users = await prisma.user.findMany({});
    return users;
  },
  get: async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  },
};
