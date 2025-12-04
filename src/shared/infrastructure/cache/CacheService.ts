import { CacheError } from '@shared/domain/errors';

/**
 * Cache entry with expiration
 */
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

/**
 * Cache Service
 * In-memory cache with 1-hour expiration as per requirements
 */
export class CacheService {
  private cache = new Map<string, CacheEntry<unknown>>();
  private readonly ttl: number;

  /**
   * @param ttl Time to live in milliseconds (default: 1 hour)
   */
  constructor(ttl: number = 60 * 60 * 1000) {
    this.ttl = ttl;
  }

  /**
   * Get cached data
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Set cached data
   */
  set<T>(key: string, data: T): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        expiresAt: Date.now() + this.ttl,
      };

      this.cache.set(key, entry as CacheEntry<unknown>);
    } catch (error) {
      if (error instanceof Error) {
        throw new CacheError(`Failed to cache data: ${error.message}`);
      }
      throw new CacheError('Failed to cache data');
    }
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Delete cached data
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get or fetch data with caching
   */
  async getOrFetch<T>(
    key: string,
    fetcher: () => Promise<T>
  ): Promise<T> {
    const cached = this.get<T>(key);
    
    if (cached !== null) {
      return cached;
    }

    const data = await fetcher();
    this.set(key, data);
    
    return data;
  }
}