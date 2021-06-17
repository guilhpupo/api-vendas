import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}
class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductsRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }
}

export default ShowProductService;
