const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllProducts = async () => {
  return prisma.product.findMany({
    include: { category: true, inventory: true },
  });
};

const getProductById = async (id) => {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true, inventory: true },
  });
};

const createProduct = async (data) => {
  return prisma.product.create({ data });
};

const updateProduct = async (id, data) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

const deleteProduct = async (id) => {
  return prisma.product.delete({ where: { id } });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
