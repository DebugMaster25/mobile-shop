import { CartItem } from '../models';

/**
 * Add to cart response from API
 */
export interface AddToCartResponse {
  count: number;
}

/**
 * Cart Repository Interface (Port)
 * Defines the contract for cart operations
 */
export interface CartRepository {
  /**
   * Add item to cart via API
   */
  addItem(item: CartItem): Promise<AddToCartResponse>;

  /**
   * Get current cart count
   */
  getCount(): Promise<number>;

  /**
   * Save cart count to persistent storage
   */
  saveCount(count: number): Promise<void>;
}