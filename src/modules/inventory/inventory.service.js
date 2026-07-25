const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllInventory = async () => {
  return prisma.inventory.findMany({
    include: { product: true },
  });
};

const getInventoryByProductId = async (productId) => {
  return prisma.inventory.findUnique({
    where: { productId },
    include: { product: true },
  });
};

const createInventory = async (data) => {
  return prisma.inventory.create({ data });
};

const updateInventory = async (productId, data) => {
  return prisma.inventory.update({
    where: { productId },
    data,
  });
};

const deleteInventory = async (productId) => {
  return prisma.inventory.delete({ where: { productId } });
};

module.exports = {
  getAllInventory,
  getInventoryByProductId,
  createInventory,
  updateInventory,
  deleteInventory,
};
