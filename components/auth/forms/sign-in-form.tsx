"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");
  const [isLoading, setIsLoading] = useState(false);

  const credentialsAction = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        callbackUrl,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form action={credentialsAction}>
      {error && (
        <div className="text-red-500 mb-4">
          {error === "CredentialsSignin"
            ? "Invalid email or password"
            : "An error occurred during sign in"}
        </div>
      )}
      <label htmlFor="credentials-email">
        Email
        <input
          type="email"
          id="credentials-email"
          name="email"
          disabled={isLoading}
        />
      </label>
      <label htmlFor="credentials-password">
        Password
        <input
          type="password"
          id="credentials-password"
          name="password"
          disabled={isLoading}
        />
      </label>
      <input
        type="submit"
        value={isLoading ? "Signing in..." : "Sign In"}
        disabled={isLoading}
      />
    </form>
  );
}
