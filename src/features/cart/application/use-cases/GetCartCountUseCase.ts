import { CartRepository } from '../../domain/repositories';

/**
 * Get Cart Count Use Case
 * Retrieves the current cart item count
 */
export class GetCartCountUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  /**
   * Execute the use case
   */
  async execute(): Promise<number> {
    return this.cartRepository.getCount();
  }
}