const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllServices = async () => {
  return prisma.service.findMany({
    include: { appointments: true },
  });
};

const getServiceById = async (id) => {
  return prisma.service.findUnique({
    where: { id },
    include: { appointments: true },
  });
};

const createService = async (data) => {
  return prisma.service.create({ data });
};

const updateService = async (id, data) => {
  return prisma.service.update({
    where: { id },
    data,
  });
};

const deleteService = async (id) => {
  return prisma.service.delete({ where: { id } });
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
