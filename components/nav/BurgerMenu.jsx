"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
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
