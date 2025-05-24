"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/css";
import { useEffect } from "react";
import useUserStore from "@/entities/user/model/user-store";

type Props = {
  userFromServer: {
    id: string;
    login: string;
    role: "USER" | "ADMIN";
  } | null;
};

export const HeaderClient = ({ userFromServer }: Props) => {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (userFromServer) {
      setUser(userFromServer);
    }
  }, [userFromServer, setUser]);

  return (
    <header className="max-w-5xl mx-auto px-4 py-6 flex items-start justify-between">
      <h1 className="flex-1 text-3xl sm:text-4xl md:text-5xl font-bold text-center sm:text-left">
        Этот сайт посвящён самому важному существу в галактике.
      </h1>

      <Link href="/sign-in">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className={cn("self-start mt-1 p-2 sm:p-3")}
          aria-label="Login"
        >
          <PawPrint className="w-12 h-12 sm:w-14 sm:h-14 text-gray-800 dark:text-gray-200" />
        </Button>
      </Link>
    </header>
  );
};
