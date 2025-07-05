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
  const { setUser } = useUserStore();

  useEffect(() => {
    if (userFromServer) {
      setUser(userFromServer);
    }
  }, [userFromServer, setUser]);

  return (
    <header className="max-w-5xl mx-auto px-4 py-6 flex items-start justify-between">
      <h1
        className="flex-1 text-3xl sm:text-4xl md:text-5xl font-bold text-center sm:text-left
        text-slate-100 
        hover:text-white
        transition-all duration-300 ease-in-out
        font-bold tracking-wide"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}
      >
        Этот сайт посвящён самому важному существу в галактике.
      </h1>

      <Link href="/sign-in">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className={cn("self-start mt-1 p-2 sm:p-3 hover:bg-slate-700/20 transition-colors")}
          aria-label="Login"
        >
          <PawPrint className="w-12 h-12 sm:w-14 sm:h-14 text-slate-300 hover:text-white transition-colors" />
        </Button>
      </Link>
    </header>
  );
};
