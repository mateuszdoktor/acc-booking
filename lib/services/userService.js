import { signUpUserRepository } from "../repositories/userRepository";
export async function signUpUserService(userData) { 
    await signUpUserRepository(userData)
}