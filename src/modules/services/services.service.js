import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllServices = async () => {
  return prisma.service.findMany({
    include: { appointments: true },
  });
};

export const getServiceById = async (id) => {
  return prisma.service.findUnique({
    where: { id },
    include: { appointments: true },
  });
};

export const createService = async (data) => {
  return prisma.service.create({ data });
};

export const updateService = async (id, data) => {
  return prisma.service.update({
    where: { id },
    data,
  });
};

export const deleteService = async (id) => {
  return prisma.service.delete({ where: { id } });
};
