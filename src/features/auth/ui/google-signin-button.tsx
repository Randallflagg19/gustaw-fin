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
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={handleSignIn}
    >
      <GoogleIcon className="w-5 h-5" />
      Войти через Google
    </Button>
  );
}
