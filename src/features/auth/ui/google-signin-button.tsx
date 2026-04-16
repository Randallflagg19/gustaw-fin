"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/shared/ui/button";
import { GoogleIcon } from "@/shared/ui/icons/google-icon";

export function GoogleSignInButton() {
  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="h-12 w-full rounded-2xl border border-[#8b6a3e]/55 bg-[#120d0a]/85 text-[#f3dfb6] hover:border-[#c89d5c] hover:bg-[#1a130f]"
      onClick={handleSignIn}
    >
      <span className="inline-flex items-center justify-center gap-3">
        <GoogleIcon className="h-5 w-5" />
        Войти через Google
      </span>
    </Button>
  );
}
