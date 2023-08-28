import {
  CreateProductService,
  DeleteProductService,
  LoadManyProductsService,
  LoadProductService,
  UpdateProductService,
} from "@/domain/use-cases";
import { ProductRepository } from "@/infra/db/repositories/product";
import { JwtProvider } from "@/infra/providers/jwt-provider";
import { ProductController } from "@/presentation/controllers/product-controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";

export function makeProductController() {
  const productRepository = new ProductRepository();

  const createProductService = new CreateProductService(productRepository);
  const loadProductService = new LoadProductService(productRepository);
  const loadManyProductsService = new LoadManyProductsService(
    productRepository
  );
  const updateProductService = new UpdateProductService(productRepository);
  const deleteProductService = new DeleteProductService(productRepository);

  const jwtProvider = new JwtProvider();
  const authMiddleware = new AuthMiddleware(jwtProvider);

  const productController = new ProductController(
    createProductService,
    loadProductService,
    loadManyProductsService,
    updateProductService,
    deleteProductService,
    authMiddleware
  );

  return productController;
}
