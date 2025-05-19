"use client";
import { handleSignUp } from "@/app/actions/signup";
import { useActionState } from "react";

export function SignUpForm() {
  const [state, action, pending] = useActionState(handleSignUp);

  return (
    <form
      action={async (formData) => {
        await action(formData);
      }}
    >
      <div>
        <input required id="name" name="name" type="text" placeholder="Name" />
        {state?.errors?.name && <p>{state.errors.name}</p>}
      </div>
      <div>
        <input
          required
          id="email"
          name="email"
          type="email"
          placeholder="Email"
        />
        {state?.errors?.email && <p>{state.errors.email}</p>}
      </div>
      <div>
        <input
          required
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        {state?.errors?.password && <p>{state.errors.password}</p>}
      </div>
      <button type="submit" disabled={pending}>
        {pending ? "Submitting ..." : "Sign Up"}
      </button>
    </form>
  );
}
