import EditProfile from "@/components/profile/EditProfile";
import { auth } from "@/auth";
export default async function ProfileInfo() {
  const session = await auth();

  return (
    <div className="h-full w-full p-16 text-2xl font-semibold bg-white">
      <EditProfile
        userImage={session?.user?.image}
        userName={session?.user?.name || ""}
      />
    </div>
  );
}
