import { PrismaClient } from "@prisma/client";
import { ApiError } from "../../utils/apiError";
import { hashPassword, comparePassword } from "../../utils/bcrypt.util";
import { signToken } from "../../utils/jwt.util";
import { RegisterInput, LoginInput } from "./auth.validation";

const prisma = new PrismaClient();

export async function registerUser(input: RegisterInput) {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existingUser) {
    throw new ApiError(409, "A user with this email already exists");
  }

  const customerRole = await prisma.role.findUnique({
    where: { name: "CUSTOMER" },
  });

  if (!customerRole) {
    throw new ApiError(500, "Default role not found. Please run the seed script.");
  }

  const hashedPassword = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: hashedPassword,
      phone: input.phone,
      address: input.address,
      roleId: customerRole.id,
    },
    include: { role: true },
  });

  const token = signToken({
    userId: user.id,
    roleId: user.roleId,
    roleName: user.role.name,
  });

  const { password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
}

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    include: { role: true },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "This account has been deactivated");
  }

  const isPasswordValid = await comparePassword(input.password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signToken({
    userId: user.id,
    roleId: user.roleId,
    roleName: user.role.name,
  });

  const { password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
}