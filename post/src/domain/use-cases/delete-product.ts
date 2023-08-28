import { ProductRepository } from "@/infra/db/repositories/product";
import { Result } from "../entities";
import { ProductNotFoundError } from "../error";

export namespace DeleteProductService {
  export type Params = {
    id: string;
  };
}

export class DeleteProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async ({ id }: DeleteProductService.Params) => {
    const productToDelete = await this.productRepository.loadProduct(id);
    if (!productToDelete) {
      return Result.fail<ProductNotFoundError>(
        new ProductNotFoundError("Product not found")
      );
    }

    const deletedProduct = await this.productRepository.deleteProduct(id);
    return Result.ok<typeof deletedProduct>(deletedProduct);
  };
}
