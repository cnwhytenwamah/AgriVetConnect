import { PrismaClient, AppointmentStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAppointments = async () => {
  return prisma.appointment.findMany({ include: { service: true } });
};

export const getAppointmentById = async (id: string) => {
  return prisma.appointment.findUnique({
    where: { id },
    include: { service: true },
  });
};

export const createAppointment = async (data: {
  userId: string;
  serviceId: string;
  scheduledAt: Date;
  notes?: string;
}) => {
  return prisma.appointment.create({ data });
};

export const updateAppointment = async (
  id: string,
  data: {
    scheduledAt?: Date;
    notes?: string;
    status?: AppointmentStatus;
  }
) => {
  return prisma.appointment.update({ where: { id }, data });
};

export const deleteAppointment = async (id: string) => {
  return prisma.appointment.delete({ where: { id } });
};
