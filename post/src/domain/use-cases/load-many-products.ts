import { Result } from "@/domain/entities";
import { ProductRepository } from "@/infra/db/repositories/product";
import { ProductNotFoundError } from "../error/product-not-found";

export namespace LoadManyProductsService {
  export type Params = void;
}

export class LoadManyProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async () => {
    const dbProduct = await this.productRepository.loadManyProducts();

    if (!dbProduct) {
      return Result.fail<ProductNotFoundError>(
        new ProductNotFoundError("Post not found")
      );
    }

    return Result.ok<unknown[]>(dbProduct);
  };
}
