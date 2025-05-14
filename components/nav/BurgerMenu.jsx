"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-700 rounded-full w-12 h-12 items-center justify-center flex text-xl text-white hover:scale-105 transition-all duration-200 cursor-pointer hover:shadow-md hover:bg-gradient-to-r hover:from-yellow-500 hover:via-orange-500 hover:to-pink-800"
      >
        <Menu />
      </button>
      {isOpen && (
        <div className="absolute top-32 right-10 bg-white border border-stone-200 rounded-3xl shadow-lg px-18 py-10 ">
          <ul className="flex flex-col items-center gap-4">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      )}
    </div>
  );
}
