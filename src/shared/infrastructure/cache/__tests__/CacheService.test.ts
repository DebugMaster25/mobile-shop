import { CacheService } from '../CacheService';

describe('CacheService', () => {
  let cacheService: CacheService;

  beforeEach(() => {
    // Create cache with 1 second TTL for testing
    cacheService = new CacheService(1000);
  });

  afterEach(() => {
    cacheService.clear();
  });

  describe('set and get', () => {
    it('should store and retrieve data', () => {
      const data = { id: 1, name: 'Test' };
      cacheService.set('test-key', data);
      
      const retrieved = cacheService.get<typeof data>('test-key');
      expect(retrieved).toEqual(data);
    });

    it('should return null for non-existent key', () => {
      const result = cacheService.get('non-existent');
      expect(result).toBeNull();
    });

    it('should return null for expired data', async () => {
      cacheService.set('test-key', 'test-data');
      
      // Wait for expiration (1 second + buffer)
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      const result = cacheService.get('test-key');
      expect(result).toBeNull();
    });
  });

  describe('has', () => {
    it('should return true for existing non-expired key', () => {
      cacheService.set('test-key', 'data');
      expect(cacheService.has('test-key')).toBe(true);
    });

    it('should return false for non-existent key', () => {
      expect(cacheService.has('non-existent')).toBe(false);
    });

    it('should return false for expired key', async () => {
      cacheService.set('test-key', 'data');
      
      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      expect(cacheService.has('test-key')).toBe(false);
    });
  });

  describe('delete', () => {
    it('should delete cached data', () => {
      cacheService.set('test-key', 'data');
      expect(cacheService.has('test-key')).toBe(true);
      
      cacheService.delete('test-key');
      expect(cacheService.has('test-key')).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear all cached data', () => {
      cacheService.set('key1', 'data1');
      cacheService.set('key2', 'data2');
      
      cacheService.clear();
      
      expect(cacheService.has('key1')).toBe(false);
      expect(cacheService.has('key2')).toBe(false);
    });
  });

  describe('getOrFetch', () => {
    it('should return cached data if available', async () => {
      const fetcher = jest.fn().mockResolvedValue('fetched-data');
      
      cacheService.set('test-key', 'cached-data');
      
      const result = await cacheService.getOrFetch('test-key', fetcher);
      
      expect(result).toBe('cached-data');
      expect(fetcher).not.toHaveBeenCalled();
    });

    it('should fetch and cache data if not available', async () => {
      const fetcher = jest.fn().mockResolvedValue('fetched-data');
      
      const result = await cacheService.getOrFetch('test-key', fetcher);
      
      expect(result).toBe('fetched-data');
      expect(fetcher).toHaveBeenCalledTimes(1);
      expect(cacheService.get('test-key')).toBe('fetched-data');
    });

    it('should fetch and cache data if expired', async () => {
      const fetcher = jest.fn().mockResolvedValue('new-data');
      
      cacheService.set('test-key', 'old-data');
      
      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      const result = await cacheService.getOrFetch('test-key', fetcher);
      
      expect(result).toBe('new-data');
      expect(fetcher).toHaveBeenCalledTimes(1);
    });
  });
});