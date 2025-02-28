'use server';

import { users } from '@/backend/domains/users/users.service';

export const getAllUsers = async () => {
  return await users.getAll();
};
