import { Id } from '@shared/domain/types';
import { Product } from '../models';

/**
 * Product Repository Interface (Port)
 * Defines the contract for product data access
 * Infrastructure layer will implement this
 */
export interface ProductRepository {
  /**
   * Get all products
   */
  findAll(): Promise<Product[]>;

  /**
   * Get product by ID
   */
  findById(id: Id): Promise<Product | null>;

  /**
   * Search products by query
   */
  search(query: string): Promise<Product[]>;
}