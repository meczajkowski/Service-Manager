'use server';

import { users } from '@/domains/users/users.service';

export const getAllUsers = async () => {
  return await users.getAll();
};
