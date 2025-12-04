import { Id } from '@shared/domain/types';
import { NotFoundError } from '@shared/domain/errors';
import { Product } from '../../domain/models';
import { ProductRepository } from '../../domain/repositories';

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: Id): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Product', id);
    }

    return product;
  }
}