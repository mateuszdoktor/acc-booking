import { AuthHeader } from "@/components/auth/auth-header";
import { ProfilePictureForm } from "@/components/auth/forms/profile-picture-form";

export default function AddProfilePicturePage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 bg-stone-100 rounded-2xl p-12 max-w-md w-full">
        <AuthHeader
          title="Add profile picture"
          subtitle="Upload an image to set as your profile picture"
        />
        <ProfilePictureForm />
      </div>
    </div>
  );
}
