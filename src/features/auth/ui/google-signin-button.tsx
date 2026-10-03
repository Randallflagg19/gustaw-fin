"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "@/shared/ui/button";
import { GoogleIcon } from "@/shared/ui/icons/google-icon";

export function GoogleSignInButton({
  label = "Войти через Google",
}: {
  label?: string;
}) {
  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
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
        <GoogleIcon className="h-5 w-5" />
        {label}
      </span>
    </Button>
  );
}
