'use server';

import { users } from '@/services/users.service';

export const getAllUsers = async () => {
  return await users.getAll();
};
