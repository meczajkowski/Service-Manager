/**
 * Repository Helpers
 *
 * This module provides helper functions for repository operations.
 */

/**
 * Executes a repository operation with error handling
 * @param operation - The repository operation to execute
 * @param errorMessage - The error message to use if the operation fails
 * @returns The result of the operation
 * @throws Error if the operation fails
 */
export async function executeRepositoryOperation<T>(
  operation: () => Promise<T>,
  errorMessage: string,
): Promise<T> {
  try {
    return await operation();
  } catch (error: unknown) {
    console.error(`Repository error: ${errorMessage}`, error);
    const errorMessage2 =
      error instanceof Error ? error.message : String(error);
    throw new Error(`${errorMessage}: ${errorMessage2}`);
  }
}
