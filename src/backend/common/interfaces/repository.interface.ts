/**
 * Repository Interfaces
 *
 * This module provides base interfaces for repositories.
 * These interfaces help standardize repository implementations.
 *
 * @module src/backend/common/interfaces
 */

/**
 * Base repository interface for all repositories
 * @template T - The DTO type returned by the repository
 * @template CreateDto - The DTO type used for creating entities
 * @template UpdateDto - The DTO type used for updating entities
 */
export interface IBaseRepository<T, CreateDto, UpdateDto> {
  /**
   * Creates a new entity
   * @param data - The data to create the entity with
   * @returns The created entity
   * @throws Error if creation fails
   */
  create(data: CreateDto): Promise<T>;

  /**
   * Finds an entity by ID
   * @param id - The ID of the entity to find
   * @returns The entity or null if not found
   */
  findById(id: string): Promise<T | null>;

  /**
   * Finds all entities
   * @returns An array of entities (empty array if none found)
   */
  findAll(): Promise<T[]>;

  /**
   * Updates an entity
   * @param id - The ID of the entity to update
   * @param data - The data to update the entity with
   * @returns The updated entity
   * @throws Error if technical operation fails (not for "not found" cases)
   */
  update(id: string, data: UpdateDto): Promise<T>;

  /**
   * Deletes an entity
   * @param id - The ID of the entity to delete
   * @throws Error if technical operation fails (not for "not found" cases)
   */
  delete(id: string): Promise<void>;
}
