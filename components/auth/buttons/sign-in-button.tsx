"use client";
import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <button className="cursor-pointer" onClick={() => signIn()}>
      Log in or Sign up
    </button>
  );
}
