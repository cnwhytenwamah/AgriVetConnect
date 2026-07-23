import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllInventory = async () => {
  return prisma.inventory.findMany({
    include: { product: true },
  });
};

export const getInventoryByProductId = async (productId: string) => {
  return prisma.inventory.findUnique({
    where: { productId },
    include: { product: true },
  });
};

export const createInventory = async (data: {
  productId: string;
  quantity?: number;
  lowStockAt?: number;
}) => {
  return prisma.inventory.create({ data });
};

export const updateInventory = async (
  productId: string,
  data: {
    quantity?: number;
    lowStockAt?: number;
  }
) => {
  return prisma.inventory.update({
    where: { productId },
    data,
  });
};

export const deleteInventory = async (productId: string) => {
  return prisma.inventory.delete({ where: { productId } });
};
