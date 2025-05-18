import Image from "next/image";
import logo from "@/public/cropped-logo.png";
import Link from "next/link";
import Form from "./Form";
import Menu from "./BurgerMenu";
export default function Nav() {
  return (
    <nav className=" bg-stone-50 shadow-sm px-12 py-10">
      <div className="flex items-center justify-between ">
        <Link href="#">
          <div className="">
            <Image src={logo} alt="logo" className="w-28 h-12" />
          </div>
        </Link>
        <Menu />
      </div>
      <div className="flex justify-center pt-8">
        <Form />
      </div>
    </nav>
  );
}
