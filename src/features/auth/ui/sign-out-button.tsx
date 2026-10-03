"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/shared/ui/button";
import { signOutAction } from "@/features/auth/actions/sign-out";
import useUserStore from "@/entities/user/model/user-store";

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleSignOut = () => {
    startTransition(async () => {
      setUser(null);

      try {
        await signOutAction();
      } catch {
        // ignore errors from legacy session removal
      }

      await signOut({ redirect: false });
      router.refresh();
    });
  };

  return (
    <Button
      type="button"
      variant="cosmicOutline"
      size="control"
      className="w-full text-[var(--cosmos-text-muted)]"
      onClick={handleSignOut}
      disabled={isPending}
    >
      Выйти из аккаунта
    </Button>
  );
}
