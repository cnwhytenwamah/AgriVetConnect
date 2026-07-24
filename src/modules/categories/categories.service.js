import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: { products: true },
  });
};

export const getCategoryById = async (id) => {
  return prisma.category.findUnique({
    where: { id },
    include: { products: true },
  });
};

export const createCategory = async (data) => {
  return prisma.category.create({ data });
};

export const updateCategory = async (id, data) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategory = async (id) => {
  return prisma.category.delete({ where: { id } });
};
