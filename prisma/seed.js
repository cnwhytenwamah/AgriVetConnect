import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const roleNames = ["ADMIN", "STAFF", "CUSTOMER"];

  for (const name of roleNames) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Roles seeded.");
  const adminRole = await prisma.role.findUniqueOrThrow({
    where: { name: "ADMIN" },
  });

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@agrivetconnect.com" },
    update: {},
    create: {
      firstName: "System",
      lastName: "Admin",
      email: "admin@agrivetconnect.com",
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  console.log(`Admin user seeded: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });