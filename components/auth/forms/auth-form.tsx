import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
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
      className="flex flex-row focus-within:ring-2 focus-within:ring-rose-500 focus-within:bg-white transition-all duration-200 rounded-3xl p-2"
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
        {children}
        {error && <div className="text-red-600 my-2">{error}</div>}

        <button
          disabled={isLoading}
          className="bg-rose-500 rounded-3xl p-2 hover:bg-rose-600 transition-all duration-200 text-white flex justify-center"
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
            className="text-rose-500 font-semibold hover:text-rose-600 hover:underline transition-colors"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </div>
      </form>
    </div>
  );
}

export { Input };
