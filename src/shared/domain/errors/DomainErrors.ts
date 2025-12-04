/**
 * Base domain error class
 */
export abstract class DomainError extends Error {
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  
  /**
   * Entity not found error
   */
  export class NotFoundError extends DomainError {
    constructor(entityName: string, id: string) {
      super(`${entityName} with id ${id} not found`);
    }
  }
  
  /**
   * Validation error
   */
  export class ValidationError extends DomainError {
    constructor(message: string) {
      super(`Validation failed: ${message}`);
    }
  }
  
  /**
   * Network/API error
   */
  export class NetworkError extends DomainError {
    constructor(message: string, public readonly statusCode?: number) {
      super(`Network error: ${message}`);
    }
  }
  
  /**
   * Cache error
   */
  export class CacheError extends DomainError {
    constructor(message: string) {
      super(`Cache error: ${message}`);
    }
  }
  
  /**
   * Business rule violation error
   */
  export class BusinessRuleError extends DomainError {
    constructor(message: string) {
      super(`Business rule violation: ${message}`);
    }
  }