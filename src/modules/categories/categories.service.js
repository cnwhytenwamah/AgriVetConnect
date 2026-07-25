const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllCategories = async () => {
  return prisma.category.findMany({
    include: { products: true },
  });
};

const getCategoryById = async (id) => {
  return prisma.category.findUnique({
    where: { id },
    include: { products: true },
  });
};

const createCategory = async (data) => {
  return prisma.category.create({ data });
};

const updateCategory = async (id, data) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

const deleteCategory = async (id) => {
  return prisma.category.delete({ where: { id } });
};
module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
