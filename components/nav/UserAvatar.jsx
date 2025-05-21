import Image from "next/image";


export default async function UserAvatar({ userImage }) {


  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-stone-200">
      <Image
        src={userImage}
        alt="User avatar"
        fill
        className="object-cover"
        sizes="64px"
        priority
      />
    </div>
  );
}
