/**
 * Shared domain types used across the application
 */

/**
 * Unique identifier type
 */
export type Id = string;

/**
 * ISO 8601 date string
 */
export type DateString = string;

/**
 * Money value in cents (to avoid floating point issues)
 */
export type Money = number;

/**
 * Result type for operations that can fail
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}