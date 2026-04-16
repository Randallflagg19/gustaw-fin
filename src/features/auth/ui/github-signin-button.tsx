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
      variant="ghost"
      className="h-12 w-full rounded-2xl border border-[#8b6a3e]/55 bg-[#120d0a]/85 text-[#f3dfb6] hover:border-[#c89d5c] hover:bg-[#1a130f]"
      onClick={handleSignIn}
    >
      <span className="inline-flex items-center justify-center gap-3">
        <GitHubIcon className="h-5 w-5" />
        Войти через GitHub
      </span>
    </Button>
  );
}
