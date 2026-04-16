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
      variant="ghost"
      className="h-14 w-full rounded-full border border-[#e1bb72] bg-[#e1bb72] text-base text-[#1a140f] hover:bg-[#ebc983]"
    >
      {children}
    </Button>
  );
}
