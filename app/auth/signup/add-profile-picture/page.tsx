"use client";

import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddProfilePicturePage() {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  return (
    <main className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-4">Add profile picture</h1>

      <UploadButton
        endpoint="imageUploader"
        onUploadBegin={() => setUploading(true)}
        onUploadError={() => {
          setUploading(false);
        }}
        onClientUploadComplete={async (res) => {
          setUploading(false);
          if (!res || !res[0]?.url) {
            return;
          }

          const imageUrl = res[0].url;

          const response = await fetch("/api/update-profile-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl }),
          });

          if (response.ok) {
            router.push("/"); 
          } else {
          }
        }}
      />

      {uploading && <p className="mt-4 text-sm text-gray-500">Sending...</p>}
    </main>
  );
}
