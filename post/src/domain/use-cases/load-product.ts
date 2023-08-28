import { Product, Result } from "@/domain/entities";
import { ProductRepository } from "@/infra/db/repositories/product";
import { ProductNotFoundError } from "../error";

export namespace LoadProductService {
  export type Params = {
    id: string;
  };
}

export class LoadProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async ({ id }: LoadProductService.Params) => {
    const dbProduct = await this.productRepository.loadProduct(id);

    if (!dbProduct) {
      return Result.fail<ProductNotFoundError>(
        new ProductNotFoundError("Post not found")
      );
    }

    const post = new Product({
      id: dbProduct.id,
      name: dbProduct.name,
      price: dbProduct.price,
      description: dbProduct.description ?? undefined,
    });
    return Result.ok<unknown>(post.toDTO());
  };
}
