import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllServices = async () => {
  return prisma.service.findMany({
    include: { appointments: true },
  });
};

export const getServiceById = async (id: string) => {
  return prisma.service.findUnique({
    where: { id },
    include: { appointments: true },
  });
};

export const createService = async (data: {
  name: string;
  description?: string;
  price: number;
  durationMins: number;
}) => {
  return prisma.service.create({ data });
};

export const updateService = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    durationMins?: number;
  }
) => {
  return prisma.service.update({
    where: { id },
    data,
  });
};

export const deleteService = async (id: string) => {
  return prisma.service.delete({ where: { id } });
};
