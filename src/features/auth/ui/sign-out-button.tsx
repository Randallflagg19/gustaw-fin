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

      await signOut({ redirect: false, callbackUrl: "/" });

      router.push("/");
      router.refresh();
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      className="h-12 w-full rounded-2xl border border-[#8b6a3e]/40 bg-[#17110d]/70 text-[#d4bf97] hover:border-[#b98d53] hover:bg-[#201611]"
      onClick={handleSignOut}
      disabled={isPending}
    >
      Выйти из аккаунта
    </Button>
  );
}
