import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return prisma.product.findMany({
    include: { category: true, inventory: true },
  });
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true, inventory: true },
  });
};

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId: string;
}) => {
  return prisma.product.create({ data });
};

export const updateProduct = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    categoryId?: string;
  }
) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({ where: { id } });
};
