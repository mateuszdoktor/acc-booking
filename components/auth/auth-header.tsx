import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

export function AuthHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          width={64}
          height={80}
          priority
          className="mb-8"
        />
      </Link>
      <h1 className="text-stone-800 text-xl font-bold pb-4">{title}</h1>
      <p className="text-stone-500 text-md mb-2">{subtitle}</p>
    </div>
  );
}
