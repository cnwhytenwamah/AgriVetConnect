import { PrismaClient } from "@prisma/client";
import { ApiError } from "../../utils/apiError";
import {
  UpdateUserInput,
  UpdateUserStatusInput,
  UpdateUserRoleInput,
} from "./users.validation";

const prisma = new PrismaClient();

const safeUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  address: true,
  isActive: true,
  role: { select: { id: true, name: true } },
  createdAt: true,
  updatedAt: true,
};

export async function getAllUsers() {
  return prisma.user.findMany({
    select: safeUserSelect,
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: safeUserSelect,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
}

export async function updateUser(id: string, input: UpdateUserInput) {
  await getUserById(id); // throws 404 if not found

  return prisma.user.update({
    where: { id },
    data: input,
    select: safeUserSelect,
  });
}

export async function updateUserStatus(id: string, input: UpdateUserStatusInput) {
  await getUserById(id);

  return prisma.user.update({
    where: { id },
    data: { isActive: input.isActive },
    select: safeUserSelect,
  });
}

export async function updateUserRole(id: string, input: UpdateUserRoleInput) {
  await getUserById(id);

  const role = await prisma.role.findUnique({
    where: { name: input.roleName },
  });

  if (!role) {
    throw new ApiError(400, "Invalid role");
  }

  return prisma.user.update({
    where: { id },
    data: { roleId: role.id },
    select: safeUserSelect,
  });
}

export async function deleteUser(id: string) {
  await getUserById(id);

  await prisma.user.delete({ where: { id } });
}