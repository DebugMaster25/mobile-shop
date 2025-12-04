import { HttpClient } from './http';
import { CacheService } from './cache';
import { StorageService } from './storage';
import { ProductApiRepository } from '@features/products/infrastructure/api';
import { CartApiRepository } from '@features/cart/infrastructure/api';
import { ProductRepository } from '@features/products/domain/repositories';
import { CartRepository } from '@features/cart/domain/repositories';
import { API_BASE_URL, CACHE_TTL } from './config';

/**
 * Repository Factory
 * Creates and configures repository instances
 * Implements Dependency Injection pattern
 */
export class RepositoryFactory {
  private static httpClient: HttpClient;
  private static cacheService: CacheService;
  private static storageService: StorageService;
  private static productRepository: ProductRepository;
  private static cartRepository: CartRepository;

  /**
   * Initialize services (call once at app startup)
   */
  static initialize(): void {
    this.httpClient = new HttpClient(API_BASE_URL);
    this.cacheService = new CacheService(CACHE_TTL);
    this.storageService = new StorageService();
  }

  /**
   * Get Product Repository instance
   */
  static getProductRepository(): ProductRepository {
    if (!this.productRepository) {
      this.ensureInitialized();
      this.productRepository = new ProductApiRepository(
        this.httpClient,
        this.cacheService
      );
    }
    return this.productRepository;
  }

  /**
   * Get Cart Repository instance
   */
  static getCartRepository(): CartRepository {
    if (!this.cartRepository) {
      this.ensureInitialized();
      this.cartRepository = new CartApiRepository(
        this.httpClient,
        this.storageService
      );
    }
    return this.cartRepository;
  }

  /**
   * Get HTTP Client instance (for testing or direct use)
   */
  static getHttpClient(): HttpClient {
    this.ensureInitialized();
    return this.httpClient;
  }

  /**
   * Get Cache Service instance (for testing or direct use)
   */
  static getCacheService(): CacheService {
    this.ensureInitialized();
    return this.cacheService;
  }

  /**
   * Get Storage Service instance (for testing or direct use)
   */
  static getStorageService(): StorageService {
    this.ensureInitialized();
    return this.storageService;
  }

  /**
   * Reset all instances (useful for testing)
   */
  static reset(): void {
    this.httpClient = new HttpClient(API_BASE_URL);
    this.cacheService = new CacheService(CACHE_TTL);
    this.storageService = new StorageService();
    // @ts-expect-error - Resetting to undefined for re-initialization
    this.productRepository = undefined;
    // @ts-expect-error - Resetting to undefined for re-initialization
    this.cartRepository = undefined;
  }

  /**
   * Ensure factory is initialized
   */
  private static ensureInitialized(): void {
    if (!this.httpClient || !this.cacheService || !this.storageService) {
      this.initialize();
    }
  }
}