import Nav from "@/components/nav/Nav";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/cropped-logo.png";
import Form from "@/components/nav/Form";
import Menu from "@/components/nav/BurgerMenu";
import { HousePlus } from "lucide-react";
import UserAvatar from "@/components/nav/UserAvatar";

export default async function Home() {
  return (
    <main>
      <Nav>
        <div className="flex items-center justify-between ">
          <Link href="/">
            <div className="">
              <Image src={logo} alt="logo" className="w-35 h-10" />
            </div>
          </Link>
          <div className="flex flex-row items-center gap-6 font-semibold">
            <Link
              href="/auth/signup"
              className="flex gap-2 rounded-3xl hover:bg-rose-500 hover:text-white hover:shadow-lg p-2 hover:scale-103 transition-all duration-200"
            >
              <HousePlus />
              Become a host
            </Link>
            <UserAvatar />
            <Menu />
          </div>
        </div>
        <div className="flex justify-center pt-8">
          <Form />
        </div>
      </Nav>
    </main>
  );
}
