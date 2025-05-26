"use client";
import Image from "next/image";
import { ClipboardPen } from "lucide-react";
import { useState } from "react";
import { EditProfilePictureForm } from "./EditProfilePictureForm";
import { EditProfileNameForm } from "./EditProfileNameForm";

export default function EditProfile({
  userImage,
  userName,
}: {
  userImage?: string | null;
  userName?: string | null;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentImage, setCurrentImage] = useState(userImage || null);
  const [currentName, setCurrentName] = useState(userName || "");

  return (
    <div>
      <h1 className="text-4xl font-bold">Edit your profile information</h1>
      <EditProfileNameForm
        initialName={currentName}
        onSuccess={setCurrentName}
      />
      {currentImage && (
        <section className="my-16">
          <header className="flex items-center gap-4 pb-6">
            <span className="text-2xl font-semibold text-stone-700">
              Profile picture
            </span>
            {!isEditing && (
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors focus:outline-none"
                onClick={() => setIsEditing(true)}
              >
                <ClipboardPen className="w-5 h-5" />
                Edit
              </button>
            )}
            {isEditing && (
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors focus:outline-none"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            )}
          </header>
          <div className="flex flex-col pl-8">
            {!isEditing ? (
              <div className="relative w-42 h-42 rounded-full overflow-hidden border-2 border-stone-100 bg-stone-50 shadow-lg p-6">
                <Image
                  src={currentImage}
                  alt="User avatar"
                  fill
                  className="object-cover"
                  sizes="64px"
                  priority
                />
              </div>
            ) : (
              <div className="pt-6 w-42">
                <EditProfilePictureForm
                  initialImage={currentImage}
                  onSuccess={(newImage) => {
                    setCurrentImage(newImage);
                    setIsEditing(false);
                  }}
                />
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
