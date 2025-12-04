import { Product } from '../../domain/models';
import { ProductRepository } from '../../domain/repositories';
import { Id } from '@shared/domain/types';
import { HttpClient } from '@shared/infrastructure/http';
import { CacheService } from '@shared/infrastructure/cache';
import { ProductDTO, ProductListDTO } from './dtos';
import { ProductMapper } from './ProductMapper';

/**
 * Product Repository Implementation using API
 * Implements caching as per requirements (1 hour expiration)
 */
export class ProductApiRepository implements ProductRepository {
  private readonly CACHE_KEY_ALL = 'products:all';
  private readonly CACHE_KEY_PREFIX = 'product:';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly cacheService: CacheService
  ) {}

  /**
   * Get all products with caching
   */
  async findAll(): Promise<Product[]> {
    return this.cacheService.getOrFetch(
      this.CACHE_KEY_ALL,
      async () => {
        const dtos = await this.httpClient.get<ProductListDTO>('/api/product');
        return ProductMapper.toDomainList(dtos);
      }
    );
  }

  /**
   * Get product by ID with caching
   */
  async findById(id: Id): Promise<Product | null> {
    const cacheKey = `${this.CACHE_KEY_PREFIX}${id}`;

    return this.cacheService.getOrFetch(
      cacheKey,
      async () => {
        try {
          const dto = await this.httpClient.get<ProductDTO>(`/api/product/${id}`);
          return ProductMapper.toDomain(dto);
        } catch (error) {
          // If 404, return null instead of throwing
          if (error instanceof Error && 'statusCode' in error && (error as { statusCode?: number }).statusCode === 404) {
            return null;
          }
          throw error;
        }
      }
    );
  }

  /**
   * Search products by query
   * Searches in brand and model fields
   */
  async search(query: string): Promise<Product[]> {
    // Get all products (from cache if available)
    const allProducts = await this.findAll();
    
    // Filter using domain logic
    return allProducts.filter((product) => product.matchesSearch(query));
  }
}