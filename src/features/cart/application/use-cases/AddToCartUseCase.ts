import { Id } from '@shared/domain/types';
import { CartItem } from '../../domain/models';
import { CartRepository } from '../../domain/repositories';

export class AddToCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(
    productId: Id,
    colorCode: number,
    storageCode: number
  ): Promise<number> {
    const cartItem: CartItem = {
      productId,
      colorCode,
      storageCode,
    };

    const response = await this.cartRepository.addItem(cartItem);
    return response.count;
  }
}