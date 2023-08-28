import { CreateProductService } from "@/domain/use-cases/create-product";
import { DeleteProductService } from "@/domain/use-cases/delete-product";
import { LoadManyProductsService } from "@/domain/use-cases/load-many-products";
import { LoadProductService } from "@/domain/use-cases/load-product";
import { UpdateProductService } from "@/domain/use-cases/update-product";
import { Request, Response, Router } from "express";
import { body, param, validationResult } from "express-validator";
import { AuthMiddleware } from "../middlewares/auth-middleware";

export class ProductController {
  readonly router: Router;

  constructor(
    private readonly createProductService: CreateProductService,
    private readonly loadProductService: LoadProductService,
    private readonly loadManyProductsService: LoadManyProductsService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly authMiddleware: AuthMiddleware
  ) {
    this.router = Router();

    this.router.get("/", this.loadManyProducts);
    this.router.post(
      "/",
      this.authMiddleware.handle,
      body("name").notEmpty(),
      body("price").notEmpty().isNumeric().isFloat({ min: 0 }),
      this.createProduct
    );
    this.router.get(
      "/:id",
      param("id").isString().isLength({
        min: 24,
        max: 24,
      }),
      this.loadProduct
    );
    this.router.put(
      "/:id",
      this.authMiddleware.handle,
      param("id").isString().isLength({
        min: 24,
        max: 24,
      }),
      body("price").optional().isNumeric().isFloat({ min: 0 }),
      this.updateProduct
    );
    this.router.delete(
      "/:id",
      this.authMiddleware.handle,
      param("id").isString().isLength({
        min: 24,
        max: 24,
      }),
      this.deleteProduct
    );
  }

  createProduct = async (req: Request, response: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return response.status(400).json(error);
    }

    const { name, price, description } =
      req.body as CreateProductService.Params;

    const productOrError = await this.createProductService.execute({
      name,
      price,
      description,
    });

    if (productOrError.isFailure()) {
      return response.status(400).json(productOrError.error);
    }

    const product = productOrError.data;
    return response.status(201).json(product);
  };

  loadProduct = async (req: Request, response: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return response.status(400).json(error);
    }

    const { id } = req.params as LoadProductService.Params;

    const productOrError = await this.loadProductService.execute({ id });

    if (productOrError.isFailure()) {
      return response.status(404).json(productOrError.error);
    }

    const product = productOrError.data;
    return response.status(200).json(product);
  };

  loadManyProducts = async (_: Request, response: Response) => {
    const productsOrError = await this.loadManyProductsService.execute();

    if (productsOrError.isFailure()) {
      return response.status(400).json(productsOrError.error);
    }

    const products = productsOrError.data;
    return response.status(200).json(products);
  };

  updateProduct = async (req: Request, response: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return response.status(400).json(error);
    }

    const { id } = req.params as Pick<UpdateProductService.Params, "id">;
    const { name, price, description } =
      req.body as UpdateProductService.Params["data"];

    const productOrError = await this.updateProductService.execute({
      id,
      data: { name, price, description },
    });

    if (productOrError.isFailure()) {
      return response.status(404).json(productOrError.error);
    }

    const product = productOrError.data;
    return response.status(200).json(product);
  };

  deleteProduct = async (req: Request, response: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return response.status(400).json(error);
    }

    const { id } = req.params as DeleteProductService.Params;

    const productOrError = await this.deleteProductService.execute({ id });

    if (productOrError.isFailure()) {
      return response.status(404).json(productOrError.error);
    }

    const product = productOrError.data;
    return response.status(200).json(product);
  };
}
