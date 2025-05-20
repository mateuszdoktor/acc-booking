"use server";
import { signUpSchema } from "@/lib/zod";
import { saltAndHashPassword } from "@/utils/password";
import { handleUserCreation, checkUserExists } from "@/utils/db";
import { User } from "@/utils/db";

export async function handleSignUp(formData: FormData) {
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

  const userData: User = { name, email, password: hashedPassword };

  const emailExists = await checkUserExists(email);
  if (emailExists)
    return {
      errors: { message: "Email is already in use" },
    };

const userCreation = await handleUserCreation(userData);
if (!userCreation) {
  return { errors: { message: "Something went wrong creating your account" } };
}
return { success: true };

}
