import { Info, Heart, House } from "lucide-react";
import Link from "next/link";

export default function ProfileSidebar() {
  return (
    <nav className="">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      <ul className="flex flex-col gap-2 text-lg">
        <ListItem href="/profile/info">
          <Info />
          <span>Profile info</span>
        </ListItem>
        <ListItem href="/profile/wishlists">
          <Heart />
          <span>Wishlists</span>
        </ListItem>
        <ListItem href="/profile/listings">
          <House />
          <span>Your listings</span>
        </ListItem>
      </ul>
    </nav>
  );
}

function ListItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-3 pl-8 py-4 rounded-2xl hover:bg-stone-200 transition all"
      >
        {children}
      </Link>
    </li>
  );
}
