export class ProductNotFoundError extends Error {
  code: string;
  constructor(message: string) {
    super(message);
    this.code = "PRODUCT_NOT_FOUND";
  }
}
