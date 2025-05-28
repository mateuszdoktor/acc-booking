"use client";

import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useState, useCallback, useTransition } from "react";
import { ChevronRight, X, Check } from "lucide-react";
import Image from "next/image";

export function ProfilePictureForm({ }: { editing?: boolean }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleUploadComplete = useCallback(async () => {
    if (!imagePreview || uploading) return;

    setUploading(true);
    setError(null);
    try {
      const response = await fetch("/api/update-profile-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: imagePreview }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        setError("Failed to update profile image.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setUploading(false);
    }
  }, [imagePreview, uploading, router]);

  const removePreview = () => {
    setImagePreview(null);
    setError(null);
  };

  return (
    <>
      {!imagePreview ? (
        <div className="flex justify-center [&>div]:w-full">
          <UploadButton
            endpoint="imageUploader"
            appearance={{
              button: `
                ut-ready:bg-sky-500 
                ut-uploading:bg-sky-600 
                ut-uploading:cursor-not-allowed
                bg-sky-500 
                rounded-3xl 
                p-2 
                hover:bg-sky-600 
                transition-all 
                duration-200 
                text-white 
                w-full
                focus:ring-2 
                focus:ring-sky-500 
                focus:ring-offset-2 
                focus:outline-none
                focus:shadow-none
                border-none
              `,
              allowedContent: "text-stone-600 text-xs hidden",
              container: "w-full",
            }}
            onClientUploadComplete={(res) => {
              if (!res?.[0]?.url) return;
              setImagePreview(res[0].url);
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-stone-200">
            <Image
              src={imagePreview}
              alt="Profile preview"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={removePreview}
              className="p-2 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 focus:outline-none"
              aria-label="Cancel"
              disabled={uploading}
            >
              <X className="w-5 h-5 text-stone-700" />
            </button>
            <button
              onClick={handleUploadComplete}
              disabled={uploading}
              className="p-2 rounded-full bg-sky-400 hover:bg-sky-500 transition-colors disabled:bg-sky-300 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:outline-none"
              aria-label="Confirm"
            >
              {uploading ? (
                <span className="loading loading-spinner loading-xs text-white" />
              ) : (
                <Check className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
      )}

      <button
        onClick={() => startTransition(() => router.push("/"))}
        className="mt-4 bg-transparent rounded-3xl p-2 hover:bg-stone-200 transition-all duration-200 text-stone-600 flex justify-center items-center gap-1 border border-stone-300 focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 focus:outline-none"
        disabled={isPending}
      >
        {isPending ? (
          <span className="loading loading-spinner loading-xs text-stone-600" />
        ) : (
          <>
            Skip for now
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
    </>
  );
}
