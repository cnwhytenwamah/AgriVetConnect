import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  return prisma.product.findMany({
    include: { category: true, inventory: true },
  });
};

export const getProductById = async (id) => {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true, inventory: true },
  });
};

export const createProduct = async (data) => {
  return prisma.product.create({ data });
};

export const updateProduct = async (id, data) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id) => {
  return prisma.product.delete({ where: { id } });
};
