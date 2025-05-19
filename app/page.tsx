"use client";
import Nav from "@/components/nav/Nav";
import { SignInButton } from "@/components/auth/buttons/sign-in-button";

export default function Home() {
  return (
    <main className="">
      <Nav />
      <SignInButton />
    </main>
  );
}
