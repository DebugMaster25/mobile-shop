import { Product } from '../../domain/models';
import { ProductRepository } from '../../domain/repositories';

export class SearchProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: string): Promise<Product[]> {
    return this.productRepository.search(query);
  }
}