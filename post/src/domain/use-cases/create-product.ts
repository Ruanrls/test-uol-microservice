import { ProductRepository } from "@/infra/db/repositories/product";
import { Product, Result } from "../entities";

export namespace CreateProductService {
  export type Params = {
    name: string;
    price: number;
    description?: string;
  };
}

export class CreateProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async ({
    name,
    price,
    description,
  }: CreateProductService.Params) => {
    const productToCreate = Product.create({
      name,
      price,
      description,
    });

    const isFailure = productToCreate.isFailure();
    if (isFailure) {
      return Result.fail<string>(productToCreate.error);
    }

    const product = productToCreate.data;
    const dbProduct = await this.productRepository.createProduct(
      product.toDTO()
    );

    return Result.ok<typeof dbProduct>(dbProduct);
  };
}
