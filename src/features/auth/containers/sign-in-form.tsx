"use client";

import type React from "react";
import { AuthFormLayout } from "@/features/auth/ui/auth-form-layout";
import { right } from "@/shared/lib/either";
import { AuthLink } from "@/features/auth/ui/auth-link";
import { AuthFields } from "@/features/auth/ui/fields";
import { SubmitButton } from "@/features/auth/ui/submit-button";
import { ErrorMessage } from "@/features/auth/ui/error-message";
import { useActionState } from "@/shared/lib/react";
import { signInAction } from "@/features/auth/actions/sign-in";
import useUserStore from "@/entities/user/model/user-store";
import { redirect } from "next/navigation";
import { GoogleSignInButton } from "@/features/auth/ui/google-signin-button";
import { GitHubSignInButton } from "@/features/auth/ui/github-signin-button";
import { SignOutButton } from "@/features/auth/ui/sign-out-button";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function SignInForm() {
  const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.user);
  const { data: session } = useSession();
  const isLoggedIn = Boolean(session?.user || currentUser);
  const [login, setLogin] = useState("");

  const wrappedSignIn = async (state: unknown, formData: FormData) => {
    const result = await signInAction(state, formData);

    if (result.type === "right" && result.value.user) {
      setUser(result.value.user);
      redirect("/");
    }
    return result;
  };

  const [formState, action, isPending] = useActionState(
    wrappedSignIn,
    right(undefined),
  );

  const handleFieldKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (
      event.key !== "Enter" ||
      event.nativeEvent.isComposing ||
      isPending ||
      isLoggedIn
    ) {
      return;
    }

    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
  };

  return (
    <AuthFormLayout
      title="Войти в культ"
      action={action}
      fields={
        <AuthFields
          loginValue={login}
          onLoginChange={(event) => setLogin(event.target.value)}
          onFieldKeyDown={handleFieldKeyDown}
        />
      }
      actions={
        <div className="space-y-3 sm:space-y-4">
          <SubmitButton isPending={isPending || isLoggedIn}>Войти</SubmitButton>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#6f5735]/45" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#120d0a] px-3 text-[0.72rem] uppercase tracking-[0.22em] text-[#9f8a68]">
                или
              </span>
            </div>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <GoogleSignInButton />
            <GitHubSignInButton />
            <div className="min-h-12">
              {isLoggedIn ? <SignOutButton /> : null}
            </div>
          </div>
        </div>
      }
      error={<ErrorMessage error={formState} />}
      link={
        <AuthLink
          text="Впервые здесь?"
          linkText="Зарегистрироваться"
          url="/sign-up"
        />
      }
    />
  );
}
