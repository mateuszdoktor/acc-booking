import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function handleUserCreation(userData) {
  const user = await prisma.user.create({ data: { ...userData } });
}
