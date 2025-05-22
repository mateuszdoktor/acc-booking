"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { AuthForm, Input } from "./auth-form";
import { AuthHeader } from "../auth-header";

export function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      callbackUrl,
    });
  };

  return (
    <AuthForm
      title="Log in"
      subtitle="Welcome back! Please sign in to continue"
      isLoading={isLoading}
      error={
        error === "CredentialsSignin"
          ? "Invalid email or password"
          : error || undefined
      }
      onSubmit={handleSubmit}
    >
      <AuthHeader title="Log in" subtitle="Create your account" />
      <Input
        isLoading={isLoading}
        icon={<Mail />}
        field="email"
        placeholder="Email"
      />
      <Input
        isLoading={isLoading}
        icon={<Lock />}
        field="password"
        placeholder="Password"
      />
    </AuthForm>
  );
}
