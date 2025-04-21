"use client";

import { useActionState } from "@/shared/lib/react";
import { AuthFormLayout } from "@/features/auth/ui/auth-form-layout";
import { right } from "@/shared/lib/either";
import { AuthLink } from "@/features/auth/ui/auth-link";
import { AuthFields } from "@/features/auth/ui/fields";
import { SubmitButton } from "@/features/auth/ui/submit-button";
import { ErrorMessage } from "@/features/auth/ui/error-message";
import { signUpAction } from "@/features/auth/actions/sign-up";

export function SignUpForm() {
  const [formState, action, isPending] = useActionState(
    signUpAction,
    right(undefined),
  );

  return (
    <AuthFormLayout
      title="Регистрация"
      description="Создайте аккаунт"
      action={action}
      fields={<AuthFields />}
      actions={
        <SubmitButton isPending={isPending}> Зарегистрироваться </SubmitButton>
      }
      error={<ErrorMessage error={formState} />}
      link={
        <AuthLink text="Уже есть аккаунт?" linkText="Войти" url="/sign-in" />
      }
    />
  );
}
