import { Button } from "@/shared/ui/button";
import React from "react";

export function SubmitButton({
  children,
  isPending,
}: {
  children: React.ReactNode;
  isPending?: boolean;
}) {
  return (
    <Button
      disabled={isPending}
      type="submit"
      variant="cosmicPrimary"
      size="hero"
      className="h-12 w-full text-base sm:h-14"
    >
      {children}
    </Button>
  );
}
