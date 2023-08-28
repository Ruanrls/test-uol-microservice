import prismaClient from "@/infra/config/prisma-client";
import { ObjectId } from "bson";

type CreateProductParams = {
  name: string;
  price: number;
  description?: string;
};

export class ProductRepository {
  loadProduct = async (id: string) => {
    const product = await prismaClient.product.findUnique({
      where: {
        id: new ObjectId(id).toString(),
      },
    });

    return product;
  };

  loadManyProducts = async () => {
    const products = await prismaClient.product.findMany();
    return products;
  };

  createProduct = async ({ name, price, description }: CreateProductParams) => {
    const dbProduct = await prismaClient.product.create({
      data: {
        name,
        price,
        description,
      },
    });

    return dbProduct;
  };

  updateProduct = async ({
    name,
    price,
    description,
    id,
  }: CreateProductParams & { id: string }) => {
    const dbProduct = await prismaClient.product.update({
      where: {
        id: new ObjectId(id).toString(),
      },
      data: { name, price, description },
    });

    return dbProduct;
  };

  deleteProduct = async (id: string) => {
    const deletedProduct = await prismaClient.product.delete({
      where: {
        id: new ObjectId(id).toString(),
      },
    });

    return deletedProduct;
  };
}
