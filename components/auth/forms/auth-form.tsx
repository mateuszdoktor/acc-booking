"use client";
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

type InputField = "email" | "password" | "name";

interface InputProps {
  isLoading: boolean;
  icon: ReactNode;
  field: InputField;
  placeholder: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  isLoading,
  icon,
  field,
  placeholder,
  error,
}) => (
  <div className="flex flex-col gap-1">
    <label
      htmlFor={`credentials-${field}`}
      className="flex flex-row focus-within:ring-2 focus-within:ring-red-400 focus-within:bg-white transition-all duration-200 rounded-3xl p-2"
    >
      {icon}
      <input
        type={field === "name" ? "text" : field}
        placeholder={placeholder}
        id={`credentials-${field}`}
        name={field}
        disabled={isLoading}
        className="focus:outline-none text-md bg-transparent mx-2 w-full"
        autoComplete={field}
      />
    </label>
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

interface AuthFormProps {
  title: string;
  subtitle: string;
  isLoading: boolean;
  error?: string;
  onSubmit: (formData: FormData) => Promise<void>;
  children?: ReactNode;
  isSignIn?: boolean;
}

export function AuthForm({
  title,
  subtitle,
  isLoading,
  error,
  onSubmit,
  children,
  isSignIn = true,
}: AuthFormProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await onSubmit(formData);
        }}
        className="flex flex-col gap-4 bg-stone-100 rounded-2xl p-12"
      >
        <div className="flex flex-col items-center">
          <Link href="/">
            <Image src={logo} alt="logo" className="w-16 h-20 mb-8" />
          </Link>
          <span className="text-stone-800 text-xl font-bold pb-4">{title}</span>
          <span className="text-stone-500 text-md mb-2">{subtitle}</span>
          {error && <div className="text-red-600 my-2">{error}</div>}
        </div>
        {children}
        <button
          disabled={isLoading}
          className="bg-red-400 rounded-3xl p-2 hover:bg-red-500 transition-all duration-200 text-white flex justify-center"
        >
          {isLoading ? (
            "Submitting..."
          ) : (
            <>
              Continue
              <span className="flex items-center w-4 mt-0.25">
                <ChevronRight />
              </span>
            </>
          )}
        </button>
        <div className="flex justify-center gap-1 text-sm pt-2">
          <span className="text-stone-600">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
          </span>
          <Link
            href={isSignIn ? "/auth/signup" : "/auth/signin"}
            className="text-red-400 font-semibold hover:text-red-500 hover:underline transition-colors"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </div>
      </form>
    </div>
  );
}

export { Input };
