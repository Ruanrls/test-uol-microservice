import { Result, type Either } from "./result";

type ProductProps = {
  id?: string;
  name: string;
  price: number;
  description?: string;
};

export class Product {
  static create(props: ProductProps): Either<string, Product> {
    if (props.price <= 0) {
      return Result.fail<string>("Price must be grather than 0");
    }

    const product = new Product(props);
    return Result.ok(product);
  }

  constructor(private readonly _props: ProductProps) {
    Object.freeze(this);
  }

  get id(): string | undefined {
    return this._props.id;
  }

  get name(): string {
    return this._props.name;
  }

  get price(): number {
    return this._props.price;
  }

  get description(): string | undefined {
    return this._props.description;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  toDTO() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
    };
  }
}
