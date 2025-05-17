"use client";
import Nav from "@/components/nav/Nav";
import {SignIn} from "@/components/auth/signin-button"
export default function Home() {
  return (
    <main className="">
      <Nav />
      <SignIn />
    </main>
  );
}
