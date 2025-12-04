/**
 * Cart API Data Transfer Objects
 */

/**
 * Add to cart request DTO
 */
export interface AddToCartRequestDTO {
    id: string;
    colorCode: number;
    storageCode: number;
  }
  
  /**
   * Add to cart response DTO
   */
  export interface AddToCartResponseDTO {
    count: number;
  }