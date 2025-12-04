import { Id } from '@shared/domain/types';

/**
 * Cart item representing a product selection
 */
export interface CartItem {
  productId: Id;
  colorCode: number;
  storageCode: number;
}

/**
 * Cart entity
 */
export class Cart {
  private items: CartItem[] = [];
  private itemCount: number = 0;

  constructor(initialCount: number = 0) {
    this.itemCount = initialCount;
  }

  /**
   * Add item to cart
   */
  addItem(item: CartItem): void {
    this.items.push(item);
    this.itemCount++;
  }

  /**
   * Get cart item count
   */
  getCount(): number {
    return this.itemCount;
  }

  /**
   * Set cart count (from API response)
   */
  setCount(count: number): void {
    this.itemCount = count;
  }

  /**
   * Get all items
   */
  getItems(): readonly CartItem[] {
    return [...this.items];
  }

  /**
   * Clear cart
   */
  clear(): void {
    this.items = [];
    this.itemCount = 0;
  }

  /**
   * Check if cart is empty
   */
  isEmpty(): boolean {
    return this.itemCount === 0;
  }
}