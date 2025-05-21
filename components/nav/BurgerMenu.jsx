"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { SignInButton } from "../auth/buttons/sign-in-button";
import { SignOutButton } from "../auth/buttons/sign-out-button";
import house from "@/public/house-icon.png";
import Image from "next/image";

export default function BurgerMenu({ name }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-red-400 rounded-full w-10 h-10 items-center justify-center flex text-xl text-white hover:bg-red-500"
      >
        <Menu />
      </button>
      {isOpen && (
        <div className="absolute top-26 right-12 bg-white border border-stone-200 rounded-3xl shadow-lg w-64 z-50">
          <ul className="flex flex-col items-center text-md">
            {name && (
              <div className="flex flex-col items-center p-4 w-full">
                <h3 className="font-medium mb-2">Welcome {name}</h3>
              </div>
            )}

            <Link href="/" className="hover:bg-stone-100 px-4 py-4 w-full ">
              <div className="flex">
                <div>
                  <span className="flex">Become a host</span>
                  <span className="text-xs font-light text-wrap">
                    It’s easy to start hosting we’re here to help every step of
                    the way.
                  </span>
                </div>
                <div>
                  <Image src={house} alt="house" className="w-36 h-" />
                </div>
              </div>
            </Link>
            <Link href="/" className="hover:bg-stone-100 px-4 py-4 w-full">
              Get help
            </Link>
            <div
              href="/"
              className="hover:bg-stone-100 px-4 py-4 w-full rounded-b-3xl "
            >
              {name ? <SignOutButton /> : <SignInButton />}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}
