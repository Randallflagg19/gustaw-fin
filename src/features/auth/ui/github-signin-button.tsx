"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/shared/ui/button";
import { GitHubIcon } from "@/shared/ui/icons/github-icon";

export function GitHubSignInButton() {
  const handleSignIn = () => {
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={handleSignIn}
    >
      <GitHubIcon className="w-5 h-5" />
      Войти через GitHub
    </Button>
  );
}

