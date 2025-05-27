import Nav from "@/components/nav/Nav";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/cropped-logo.png";
import UserAvatar from "@/components/nav/UserAvatar";
import Menu from "@/components/nav/BurgerMenu";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <header className="">
        <Nav>
          <div className="flex items-center justify-between px-8 py-4">
            <Link href="/">
              <Image src={logo} alt="logo" className="w-36 h-10" />
            </Link>
            <div className="flex items-center gap-6 font-semibold">
              <UserAvatar />
              <Menu />
            </div>
          </div>
        </Nav>
      </header>

      <div className="flex flex-1 pl-24">
        <aside className="w-80 border-r-1 p-6 ">
          <ProfileSidebar />
        </aside>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
