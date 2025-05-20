import { PrismaClient } from "@prisma/client";
import { comparePasswords } from "./password";

const prisma = new PrismaClient();

export interface User {
  id?: string;
  email: string;
  name?: string | null;
  password: string | null;
}

export const getUserFromDb = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  if (!user.password) {
    return null;
  }

  // Compare the provided password with the stored hash
  if (!comparePasswords(password, user.password)) {
    return null;
  }

  return user;
};

export const checkUserExists = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user ? true : false;
};

export const handleUserCreation = async (userData: User): Promise<boolean> => {
  const newUser = await prisma.user.create({ data: { ...userData } });
  return newUser ? true : false;
};
