"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function SignIn() {
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            callbackUrl,
          });
        }}
        className="w-full max-w-md space-y-4 rounded-lg border p-6 shadow-lg"
      >
        <h1 className="text-2xl font-bold">Sign In</h1>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="w-full rounded-md border p-2"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          className="w-full rounded-md border p-2"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
