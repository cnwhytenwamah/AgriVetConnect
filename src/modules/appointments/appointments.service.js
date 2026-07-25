const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllAppointments = async () => {
  return prisma.appointment.findMany({
    include: { service: true, user: true },
  });
};

const getAppointmentById = async (id) => {
  return prisma.appointment.findUnique({
    where: { id },
    include: { service: true, user: true },
  });
};

const createAppointment = async (data) => {
  return prisma.appointment.create({ data });
};

const updateAppointment = async (id, data) => {
  return prisma.appointment.update({ where: { id }, data });
};

const deleteAppointment = async (id) => {
  return prisma.appointment.delete({ where: { id } });
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
