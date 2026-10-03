"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/shared/ui/button";
import { GitHubIcon } from "@/shared/ui/icons/github-icon";

export function GitHubSignInButton({
  label = "Войти через GitHub",
}: {
  label?: string;
}) {
  const handleSignIn = () => {
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <Button
      type="button"
      variant="cosmicOutline"
      size="control"
      className="w-full"
      onClick={handleSignIn}
    >
      <span className="inline-flex items-center justify-center gap-3">
        <GitHubIcon className="h-5 w-5" />
        {label}
      </span>
    </Button>
  );
}
