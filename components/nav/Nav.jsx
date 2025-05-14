import Image from "next/image";
import logo from "@/public/main-logo.png";
import Link from "next/link";
import Form from "./Form";
import Menu from "./BurgerMenu";
export default function Nav() {
  return (
    <nav className="flex items-center px-10 py-4 justify-between bg-stone-50 shadow-md">
      <Link href="#">
        <div className="flex items-center">
          <Image src={logo} alt="logo" className="w-14 h-14" />
          <h1 className="bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-700  text-3xl font-bold text-transparent">
            stay
          </h1>
        </div>
      </Link>
      <Form />
      <Menu />
    </nav>
  );
}
