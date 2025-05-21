import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { comparePasswords } from "./password";

const prisma = new PrismaClient();

export interface User extends Omit<PrismaUser, "password"> {
  password: string | null;
}

export const getUserFromDb = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) return null;

  const isPasswordCorrect = await comparePasswords(password, user.password);
  if (!isPasswordCorrect) return null;

  return user;
};

export const checkUserExists = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(user);
};

export const handleUserCreation = async (
  userData: Omit<User, "id">
): Promise<boolean> => {
  try {
    await prisma.user.create({ data: userData });
    return true;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

export const updateUserProfileImage = async (
  userId: string,
  imageUrl: string
): Promise<boolean> => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });
    return true;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};
