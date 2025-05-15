import Image from "next/image";
import logo from "@/public/ChatGPT Image May 15, 2025, 12_26_57 PM.png";
import Link from "next/link";
import Form from "./Form";
import Menu from "./BurgerMenu";
export default function Nav() {
  return (
    <nav className="bg-stone-50 shadow-sm px-8 pb-6">
      <div className="flex items-center justify-between ">
        <Link href="#">
          <div className="">
            <Image src={logo} alt="logo" className="w-28 h-28" />
          </div>
        </Link>
        <Menu />
      </div>
      <div className="flex justify-center">
        <Form />
      </div>
    </nav>
  );
}
