/**
 * Common Action Utilities
 *
 * This module provides utilities for server actions to handle common patterns
 * like error handling and path revalidation.
 */

import { revalidatePath } from 'next/cache';

export type ActionOptions = {
  errorMessage: string;
  revalidatePaths?: string[];
};

export type ExecuteActionParams<T> = {
  fn: () => Promise<T>;
  options: ActionOptions;
};

/**
 * Executes a server action with error handling and path revalidation
 *
 * @param params - The parameters for executing the action
 * @returns The result of the action
 */
export const executeAction = async <T>({
  fn,
  options,
}: ExecuteActionParams<T>): Promise<T> => {
  try {
    const data = await fn();
    options.revalidatePaths?.forEach((path) => revalidatePath(path));
    return data;
  } catch (error) {
    console.error(`Action error: ${options.errorMessage}`, error);
    throw new Error(options.errorMessage);
  }
};
