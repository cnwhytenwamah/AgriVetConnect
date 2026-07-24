const { PrismaClient } = require("@prisma/client");
const { ApiError } = require("../../utils/apiError");

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

async function getAllUsers() {
  return prisma.user.findMany({
    select: safeUserSelect,
    orderBy: { createdAt: "desc" },
  });
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: safeUserSelect,
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
}

async function updateUser(id, input) {
  await getUserById(id); // throws 404 if not found

  return prisma.user.update({
    where: { id },
    data: input,
    select: safeUserSelect,
  });
}

async function updateUserStatus(id, input) {
  await getUserById(id);

  return prisma.user.update({
    where: { id },
    data: { isActive: input.isActive },
    select: safeUserSelect,
  });
}

async function updateUserRole(id, input) {
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

async function deleteUser(id) {
  await getUserById(id);

  await prisma.user.delete({ where: { id } });
}

module.exports = { getAllUsers, getUserById, updateUser, updateUserStatus, updateUserRole, deleteUser,};