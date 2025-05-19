import { handleUserCreation } from "../repositories/userRepository";

export async function handleUserSignUp(userData) {
  await handleUserCreation(userData);
}
