import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function signUpUserRepository(userData) {
  const user = await prisma.user.create({ data: { ...userData } });
}
