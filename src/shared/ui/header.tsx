"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/css";

export const Header = () => {
  return (
    <header className="relative w-full">
      <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          Этот сайт посвящён самому важному существу в этой галактике.
        </h1>
      </div>
      <Link href="/sign-up" passHref>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className={cn("absolute top-4 right-4", "p-2 sm:p-3")}
          aria-label="Login"
        >
          <PawPrint className="w-14 h-14 text-gray-800 dark:text-gray-200" />
        </Button>
      </Link>
    </header>
  );
};
