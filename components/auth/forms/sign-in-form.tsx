"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, ReactNode } from "react";
import { Mail, Lock, ChevronRight } from "lucide-react";
import Image from "next/image";
import logo from "@/public/cropped-logo.png";
import Link from "next/link";

type InputField = "email" | "password";

interface InputProps {
  isLoading: boolean;
  icon: ReactNode;
  field: InputField;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  isLoading,
  icon,
  field,
  placeholder,
}) => (
  <label
    htmlFor={`credentials-${field}`}
    className="flex flex-row focus-within:border-2 focus-within:border-red-400 focus-within:bg-white rounded-3xl p-2"
  >
    {icon}
    <input
      type={field}
      placeholder={placeholder}
      id={`credentials-${field}`}
      name={field}
      disabled={isLoading}
      className="focus:outline-none text-md bg-transparent mx-2 w-full"
      autoComplete={field}
    />
  </label>
);

export function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      callbackUrl,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-stone-100 rounded-2xl p-12"
      >
        <div className="flex flex-col items-center">
          <Link href="/">
            <Image src={logo} alt="logo" className="w-28 h-12 mb-8" />
          </Link>
          <span className="text-stone-800 text-xl font-bold pb-4">Sign in</span>
          <span className="text-stone-500 text-md mb-2">
            Welcome back! Please sign in to continue
          </span>
          {error && (
            <div className="text-red-600 my-2">
              {error === "CredentialsSignin"
                ? "Invalid email or password"
                : "An error occurred during sign in"}
            </div>
          )}
        </div>
        <Input
          isLoading={isLoading}
          icon={<Mail />}
          field="email"
          placeholder="Email"
        />
        <Input
          isLoading={isLoading}
          icon={<Lock />}
          field="password"
          placeholder="Password"
        />
        <button
          disabled={isLoading}
          className="bg-red-400 rounded-3xl p-2 hover:bg-red-500 hover:scale-103 transition-all duration-200 text-white flex justify-center"
        >
          {isLoading ? (
            "Signing in..."
          ) : (
            <>
              Continue
              <span className="flex items-center w-4">
                <ChevronRight />
              </span>
            </>
          )}
        </button>
        <div className="flex justify-center gap-1 text-sm pt-2">
          <span>Don&apos;t have an account?</span>
          <Link href="/auth/signup" className="font-semibold hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
