import Image from "next/image";
import logo from "@/public/cropped-logo.png";
import Link from "next/link";
import Form from "./Form";
import Menu from "./BurgerMenu";
import { HousePlus } from "lucide-react";
export default function Nav() {
  return (
    <nav className=" bg-stone-50 shadow-sm px-12 py-10">
      <div className="flex items-center justify-between ">
        <Link href="/">
          <div className="">
            <Image src={logo} alt="logo" className="w-28 h-12" />
          </div>
        </Link>
        <div className="flex flex-row items-center gap-6 font-semibold">
          <Link href="/auth/signup" className="flex gap-2 rounded-3xl hover:bg-red-500 hover:text-white hover:shadow-lg p-2 hover:scale-103 transition-all duration-200">
            <HousePlus />
            Become a host
          </Link>
          <Menu />
        </div>
      </div>
      <div className="flex justify-center pt-8">
        <Form />
      </div>
    </nav>
  );
}
