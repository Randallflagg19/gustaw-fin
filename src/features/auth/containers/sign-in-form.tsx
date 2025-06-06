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
export function SignInForm() {
  const setUser = useUserStore((state) => state.setUser);

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

  return (
    <AuthFormLayout
      title="Вход в аккаунт"
      description="Добро пожаловать"
      action={action}
      fields={<AuthFields />}
      actions={<SubmitButton isPending={isPending}> Войти </SubmitButton>}
      error={<ErrorMessage error={formState} />}
      link={
        <AuthLink
          text="Еще не зарегестрированы?"
          linkText="Регистрация"
          url="/sign-up"
        />
      }
    />
  );
}
