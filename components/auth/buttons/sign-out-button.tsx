"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
    >
      Sign Out
    </button>
  );
}
