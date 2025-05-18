"use server"
import { signUpSchema } from "@/lib/zod";
import { saltAndHashPassword } from "@/utils/password";
import { signUpUserService } from "@/lib/services/userService";
import {} from "next/navigation";

export async function signUp(formData: FormData) {
  // Validate form fields
  const validatedFields = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = saltAndHashPassword(password);

  const userData = { name, email, password: hashedPassword };
  await signUpUserService(userData);
    
}
