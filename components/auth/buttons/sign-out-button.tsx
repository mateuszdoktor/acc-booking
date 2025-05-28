"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
    >
      Sign Out
    </button>
  );
}
