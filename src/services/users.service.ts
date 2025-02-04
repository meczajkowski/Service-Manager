import { prisma } from '../../prisma/prisma';

/**
 * Find a user by email
 * @param email - The email of the user to find
 * @returns The user object
 */
export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};
