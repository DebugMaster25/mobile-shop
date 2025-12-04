import { CartItem } from '../../domain/models';
import { CartRepository, AddToCartResponse } from '../../domain/repositories';
import { HttpClient } from '@shared/infrastructure/http';
import { StorageService } from '@shared/infrastructure/storage';
import { AddToCartRequestDTO, AddToCartResponseDTO } from './dtos';

/**
 * Cart Repository Implementation using API and localStorage
 * Persists cart count to localStorage as per requirements
 */
export class CartApiRepository implements CartRepository {
  private readonly STORAGE_KEY = 'cart:count';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly storageService: StorageService
  ) {}

  /**
   * Add item to cart via API
   */
  async addItem(item: CartItem): Promise<AddToCartResponse> {
    const requestDto: AddToCartRequestDTO = {
      id: item.productId,
      colorCode: item.colorCode,
      storageCode: item.storageCode,
    };

    const responseDto = await this.httpClient.post<AddToCartResponseDTO>(
      '/api/cart',
      requestDto
    );

    // Persist count to localStorage
    await this.saveCount(responseDto.count);

    return {
      count: responseDto.count,
    };
  }

  /**
   * Get current cart count from localStorage
   */
  async getCount(): Promise<number> {
    return Promise.resolve(this.storageService.get<number>(this.STORAGE_KEY) ?? 0);
  }

  /**
   * Save cart count to localStorage
   */
  async saveCount(count: number): Promise<void> {
    return Promise.resolve(this.storageService.set(this.STORAGE_KEY, count));
  }
}