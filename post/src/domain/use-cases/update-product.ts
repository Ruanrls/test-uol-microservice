import { ProductRepository } from "@/infra/db/repositories/product";
import { Product, Result } from "../entities";
import { ProductNotFoundError } from "../error";

export namespace UpdateProductService {
  export type Params = {
    id: string;
    data: {
      name: string;
      price: number;
      description?: string;
    };
  };
}

export class UpdateProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async ({
    id,
    data: { name, price, description },
  }: UpdateProductService.Params) => {
    const dbProduct = await this.productRepository.loadProduct(id);
    if (!dbProduct) {
      return Result.fail<ProductNotFoundError>(
        new ProductNotFoundError("Product not found")
      );
    }

    const productToUpdate = Product.create({
      id: dbProduct.id,
      name,
      price,
      description,
    });

    const isFailure = productToUpdate.isFailure();
    if (isFailure) {
      return Result.fail<string>(productToUpdate.error);
    }

    const product = {
      id: dbProduct.id,
      name,
      price,
      description,
    };
    const updatedProduct = await this.productRepository.updateProduct(product);
    return Result.ok<typeof updatedProduct>(updatedProduct);
  };
}
