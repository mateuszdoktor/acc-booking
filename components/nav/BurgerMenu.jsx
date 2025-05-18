"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SignIn } from "../auth/signin-button";
import { SignOutButton } from "../auth/signout-button";
export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className=" bg-red-400 rounded-full w-12 h-12 items-center justify-center flex text-xl text-white hover:bg-red-500 "
      >
        <Menu />
      </button>
      {isOpen && (
        <div className="absolute top-26 right-12 bg-white border border-stone-200 rounded-3xl shadow-lg">
          <ul className="flex flex-col items-center text-md">
            {session?.user && <h3>Welcome {session.user.name}</h3>}
            <div
              href="/"
              className="hover:bg-stone-100 px-16 py-4 w-full rounded-t-3xl "
            >
              {session ? <SignOutButton /> : <SignIn />}
            </div>
            <Link href="/auth/signup" className="hover:bg-stone-100 px-16 py-4 w-full ">
              Sign up
            </Link>
            <Link href="/" className="hover:bg-stone-100 px-16 py-4 w-full ">
              Become a host
            </Link>
            <Link
              href="/"
              className="hover:bg-stone-100 px-16 py-4 w-full rounded-b-3xl "
            >
              Get help
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}
