"use client";

import { Menu, DoorOpen, Heart, User, CircleHelp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { SignInButton } from "../auth/buttons/sign-in-button";
import { SignOutButton } from "../auth/buttons/sign-out-button";
import house from "@/public/house-icon.png";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function BurgerMenu() {
  const { data: session } = useSession();
  const name = session?.user?.name;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-sky-500 hover:bg-sky-600 transition-colors rounded-full w-10 h-10 flex items-center justify-center text-white"
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 bg-white border border-stone-200 rounded-3xl shadow-xl w-80 z-50 overflow-hidden">
          <ul className="flex flex-col text-base text-gray-800">
            {name && (
              <li className="px-6 py-4 text-center bg-gray-50">
                <h3 className="text-sm font-medium text-gray-600">
                  Welcome <span className="font-semibold">{name}</span>
                </h3>
              </li>
            )}

            {session && (
              <>
                <li>
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-6 py-3 rounded-none transition-colors hover:bg-sky-50 hover:text-sky-600 focus:bg-sky-100 focus:text-sky-700 w-full"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlists</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile/info"
                    className="flex items-center gap-3 px-6 py-3 rounded-none transition-colors hover:bg-sky-50 hover:text-sky-600 focus:bg-sky-100 focus:text-sky-700 w-full"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span>Profile</span>
                  </Link>
                </li>
                <div className="h-px bg-stone-200 my-1 mx-6" />
              </>
            )}

            <li>
              <Link
                href="/"
                className="flex items-start gap-4 px-6 py-4 rounded-none transition-colors hover:bg-sky-50 hover:text-sky-600 focus:bg-sky-100 focus:text-sky-700 w-full"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">Become a host</p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">
                    It’s easy to start hosting — we’re here to help every step
                    of the way.
                  </p>
                </div>
                <div className="w-16 h-16 flex-shrink-0">
                  <Image
                    src={house}
                    alt="house icon"
                    className="object-contain w-full h-full"
                  />
                </div>
              </Link>
            </li>

            <li>
              <Link
                href="/"
                className="flex items-center gap-3 px-6 py-3 rounded-none transition-colors hover:bg-sky-50 hover:text-sky-600 focus:bg-sky-100 focus:text-sky-700 w-full"
              >
                <CircleHelp className="w-5 h-5 text-gray-600" />
                <span> Get help</span>
              </Link>
            </li>

            <div className="h-px bg-stone-200 my-1 mx-6" />

            <li>
              <div className="flex items-center gap-2 px-6 py-4 rounded-none transition-colors cursor-pointer hover:bg-sky-50 hover:text-sky-600 focus:bg-sky-100 focus:text-sky-700 w-full">
                {name ? (
                  <>
                    <DoorOpen className="w-5 h-5 text-gray-600" />
                    <SignOutButton />
                  </>
                ) : (
                  <SignInButton />
                )}
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
