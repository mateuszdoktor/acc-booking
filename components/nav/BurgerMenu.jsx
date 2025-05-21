"use client";

import { Menu, DoorOpen, Heart, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { SignInButton } from "../auth/buttons/sign-in-button";
import { SignOutButton } from "../auth/buttons/sign-out-button";
import house from "@/public/house-icon.png";
import Image from "next/image";

export default function BurgerMenu({ name }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-red-400 hover:bg-red-500 transition-colors rounded-full w-10 h-10 flex items-center justify-center text-white"
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 bg-white border border-stone-200 rounded-3xl shadow-xl w-72 z-50 overflow-hidden">
          <ul className="flex flex-col text-base text-gray-800">
            {name && (
              <li className="p-4 text-center">
                <h3 className="text-sm font-medium text-gray-600">
                  Welcome <span className="font-semibold">{name}</span>
                </h3>
              </li>
            )}

            <li>
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 hover:bg-stone-100 transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span>Wishlists</span>
              </Link>
            </li>

            <li>
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 hover:bg-stone-100 transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
                <span>Profile</span>
              </Link>
            </li>

            {/* separator */}
            <div className="h-px bg-stone-200 w-full mx-4 my-1" />

            <li className="px-4 py-4">
              <Link
                href="/"
                className="flex items-start gap-4 hover:bg-stone-100 rounded-xl p-2 transition-colors"
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
                className="block px-4 py-3 hover:bg-stone-100 transition-colors"
              >
                Get help
              </Link>
            </li>

            {/* separator */}
            <div className="h-px bg-stone-200 w-full mx-4 my-1" />

            <li className="px-4 py-4">
              {name ? (
                <div className="flex items-center gap-2 hover:bg-stone-100 p-2 rounded-xl transition-colors">
                  <DoorOpen className="w-5 h-5 text-gray-600" />
                  <SignOutButton />
                </div>
              ) : (
                <SignInButton />
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
