"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function UserAvatar() {
  const { data: session } = useSession();
  const userImage = session?.user?.image;

  return (
    <>
      {userImage ? (
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-stone-200">
          <Image
            src={userImage}
            alt="User avatar"
            fill
            className="object-cover"
            sizes="64px"
            priority
          />
        </div>
      ) : null}
    </>
  );
}
