/**
 * Storage Service
 * Wrapper around localStorage for type-safe storage operations
 */
export class StorageService {
    /**
     * Get item from storage
     */
    get<T>(key: string): T | null {
      try {
        const item = localStorage.getItem(key);
        
        if (!item) {
          return null;
        }
  
        return JSON.parse(item) as T;
      } catch (error) {
        console.error(`Failed to get item from storage: ${key}`, error);
        return null;
      }
    }
  
    /**
     * Set item in storage
     */
    set<T>(key: string, value: T): void {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Failed to set item in storage: ${key}`, error);
      }
    }
  
    /**
     * Remove item from storage
     */
    remove(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Failed to remove item from storage: ${key}`, error);
      }
    }
  
    /**
     * Clear all storage
     */
    clear(): void {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Failed to clear storage', error);
      }
    }
  
    /**
     * Check if key exists
     */
    has(key: string): boolean {
      return localStorage.getItem(key) !== null;
    }
  }