import { Product } from '../../domain/models';
import { ProductRepository } from '../../domain/repositories';

export class GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}