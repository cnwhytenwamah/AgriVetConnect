import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllInventory = async () => {
  return prisma.inventory.findMany({
    include: { product: true },
  });
};

export const getInventoryByProductId = async (productId) => {
  return prisma.inventory.findUnique({
    where: { productId },
    include: { product: true },
  });
};

export const createInventory = async (data) => {
  return prisma.inventory.create({ data });
};

export const updateInventory = async (productId, data) => {
  return prisma.inventory.update({
    where: { productId },
    data,
  });
};

export const deleteInventory = async (productId) => {
  return prisma.inventory.delete({ where: { productId } });
};
