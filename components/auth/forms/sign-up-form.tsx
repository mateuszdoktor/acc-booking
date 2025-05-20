"use client";
import { handleSignUp } from "@/app/actions/signup";
import { useActionState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { AuthForm, Input } from "./auth-form";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type SignUpState = {
  success?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    message?: string;
  };
};

export function SignUpForm() {
  const [state, action, pending] = useActionState<SignUpState, FormData>(
    async (_prevState, formData) => await handleSignUp(formData),
    { errors: {} }
  );

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/auth/signin");
    }
  }, [state, router]);

  return (
    <AuthForm
      title="Sign up"
      subtitle="Create your account to get started"
      isLoading={pending}
      onSubmit={async (formData) => {
        startTransition(() => action(formData));
      }}
      isSignIn={false}
      error={state?.errors?.message}
    >
      <Input
        isLoading={pending}
        icon={<User />}
        field="name"
        placeholder="Name"
        error={state?.errors?.name?.[0]}
      />
      <Input
        isLoading={pending}
        icon={<Mail />}
        field="email"
        placeholder="Email"
        error={state?.errors?.email?.[0]}
      />
      <Input
        isLoading={pending}
        icon={<Lock />}
        field="password"
        placeholder="Password"
        error={state?.errors?.password?.[0]}
      />
    </AuthForm>
  );
}
