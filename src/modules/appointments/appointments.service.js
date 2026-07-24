import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAppointments = async () => {
  return prisma.appointment.findMany({ include: { service: true } });
};

export const getAppointmentById = async (id) => {
  return prisma.appointment.findUnique({
    where: { id },
    include: { service: true },
  });
};

export const createAppointment = async (data) => {
  return prisma.appointment.create({ data });
};

export const updateAppointment = async (id, data) => {
  return prisma.appointment.update({ where: { id }, data });
};

export const deleteAppointment = async (id) => {
  return prisma.appointment.delete({ where: { id } });
};
