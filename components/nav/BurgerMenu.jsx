"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className=" bg-red-400 rounded-full w-12 h-12 items-center justify-center flex text-xl text-white hover:bg-red-500 "
      >
        <Menu />
      </button>
      {isOpen && (
        <div className="absolute top-20 right-12 bg-white border border-stone-200 rounded-3xl shadow-lg">
          <ul className="flex flex-col items-center text-md">
            <Link
              href="/"
              className="hover:bg-stone-100 px-16 py-4 w-full rounded-t-3xl "
            >
              Sign in
            </Link>
            <Link href="/" className="hover:bg-stone-100 px-16 py-4 w-full ">
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
