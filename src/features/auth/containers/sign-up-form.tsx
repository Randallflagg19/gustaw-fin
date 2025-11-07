"use client";

import { useActionState } from "@/shared/lib/react";
import { AuthFormLayout } from "@/features/auth/ui/auth-form-layout";
import { right } from "@/shared/lib/either";
import { AuthLink } from "@/features/auth/ui/auth-link";
import { AuthFields } from "@/features/auth/ui/fields";
import { SubmitButton } from "@/features/auth/ui/submit-button";
import { ErrorMessage } from "@/features/auth/ui/error-message";
import { signUpAction } from "@/features/auth/actions/sign-up";
import { GoogleSignInButton } from "@/features/auth/ui/google-signin-button";
import { GitHubSignInButton } from "@/features/auth/ui/github-signin-button";
import { SignOutButton } from "@/features/auth/ui/sign-out-button";
import useUserStore from "@/entities/user/model/user-store";
import { useSession } from "next-auth/react";

export function SignUpForm() {
  const [formState, action, isPending] = useActionState(
    signUpAction,
    right(undefined),
  );
  const currentUser = useUserStore((state) => state.user);
  const { data: session } = useSession();
  const isLoggedIn = Boolean(session?.user || currentUser);

  return (
    <AuthFormLayout
      title="Регистрация"
      description="Создайте аккаунт"
      action={action}
      fields={<AuthFields />}
      actions={
        <div className="space-y-4">
          <SubmitButton isPending={isPending || isLoggedIn}>
            Зарегистрироваться
          </SubmitButton>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">или</span>
            </div>
          </div>
          <div className="space-y-3">
            <GoogleSignInButton />
            <GitHubSignInButton />
            {isLoggedIn ? <SignOutButton /> : null}
          </div>
        </div>
      }
      error={<ErrorMessage error={formState} />}
      link={
        <AuthLink text="Уже есть аккаунт?" linkText="Войти" url="/sign-in" />
      }
    />
  );
}
