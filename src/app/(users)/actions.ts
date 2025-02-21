'use server';

import { users } from '@/backend/users/users.service';

export const getAllUsers = async () => {
  return await users.getAll();
};
