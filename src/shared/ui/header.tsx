"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/css";

export const Header = () => {
  return (
    <header className="max-w-5xl mx-auto px-4 py-6 flex items-start justify-between">
      <h1 className="flex-1 text-3xl sm:text-4xl md:text-5xl font-bold text-center sm:text-left">
        Этот сайт посвящён самому важному существу в этой галактике.
      </h1>

      <Link href="/sign-up">
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
