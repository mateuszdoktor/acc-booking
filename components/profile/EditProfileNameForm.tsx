"use client";
import { useState } from "react";
import { ClipboardPen } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export function EditProfileNameForm({
  initialName,
  onSuccess,
}: {
  initialName: string;
  onSuccess: (newName: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(initialName);
  const [nameInput, setNameInput] = useState(initialName);
  const [nameError, setNameError] = useState<string | null>(null);
  const [nameLoading, setNameLoading] = useState(false);
  const { data: session } = useSession();

  const handleNameSave = async () => {
    setNameLoading(true);
    setNameError(null);
    try {
      const response = await fetch("/api/update-profile-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput }),
      });
      if (response.ok) {
        setCurrentName(nameInput);
        setIsEditing(false);
        onSuccess(nameInput);
        if (session?.user?.email) {
          await signOut({ redirect: false });
          await signIn("credentials", {
            email: session.user.email,
            password: localStorage.getItem("user-password") || "",
            redirect: false,
          });
        }
        window.dispatchEvent(new Event("profile-updated"));
      } else {
        setNameError("Failed to update name.");
      }
    } catch {
      setNameError("Something went wrong.");
    } finally {
      setNameLoading(false);
    }
  };

  return (
    <section className="my-8">
      <header className="flex items-center gap-4 pb-6">
        <span className="text-2xl font-semibold text-stone-700">Name</span>
        {!isEditing && (
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors focus:outline-none"
            onClick={() => {
              setNameInput(currentName);
              setIsEditing(true);
            }}
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
          <span className="text-lg text-stone-800 font-medium">
            {currentName}
          </span>
        ) : (
          <div className="flex flex-col gap-2 w-64">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="border rounded-lg px-3 py-2 text-stone-800 focus:ring-2 focus:ring-red-400 focus:outline-none"
              disabled={nameLoading}
              maxLength={50}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleNameSave}
                disabled={nameLoading || !nameInput.trim()}
                className="px-4 py-2 rounded-lg bg-red-400 hover:bg-red-500 text-white font-medium transition-colors disabled:bg-red-300"
              >
                {nameLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                disabled={nameLoading}
                className="px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
            {nameError && (
              <div className="text-red-500 text-sm">{nameError}</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
