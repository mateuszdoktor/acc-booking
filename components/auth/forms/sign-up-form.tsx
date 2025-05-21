"use client";

import { handleSignUp } from "@/app/actions/signup";
import { useActionState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { AuthForm, Input } from "./auth-form";
import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { AuthHeader } from "../auth-header";

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
  const router = useRouter();
  const formDataRef = useRef<FormData | null>(null);

  const [state, action, pending] = useActionState<SignUpState, FormData>(
    async (_prevState, formData) => {
      formDataRef.current = formData;
      return await handleSignUp(formData);
    },
    { errors: {} }
  );

  useEffect(() => {
    const tryAutoLogin = async () => {
      if (state?.success && formDataRef.current) {
        const email = formDataRef.current.get("email") as string;
        const password = formDataRef.current.get("password") as string;

        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.ok) {
          router.push("/");
        } else {
          console.error("Auto-login failed", res?.error);
        }
      }
    };

    tryAutoLogin();
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
      <AuthHeader title="Sign Up" subtitle="Create your account" />

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
