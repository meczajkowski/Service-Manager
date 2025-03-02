'use server';

import { usersService } from '@/backend/services';
import { executeAction } from '@/lib/actions';

export const getAllUsers = async () => {
  return executeAction({
    fn: () => usersService.getAll(),
    options: {
      errorMessage: 'Failed to get users',
    },
  });
};
