"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/css";
import { useEffect } from "react";

export const Header = () => {
  useEffect(() => { }, []);

  return (
    <header className="max-w-5xl mx-auto px-4 py-6 flex items-start justify-between">
      <h1
        className="flex-1 text-3xl sm:text-4xl md:text-5xl font-bold text-center sm:text-left
        text-purple-400 
        shadow-lg
        hover:text-purple-300
        transition-all duration-300 ease-in-out
        font-extrabold tracking-wide"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(147,51,234,0.6)' }}
      >
        Этот сайт посвящён самому важному существу в галактике.
      </h1>

      <Link href="/sign-in">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className={cn("self-start mt-1 p-2 sm:p-3 hover:bg-purple-500/20 transition-colors")}
          aria-label="Login"
        >
          <PawPrint className="w-12 h-12 sm:w-14 sm:h-14 text-purple-400 hover:text-purple-300 transition-colors" />
        </Button>
      </Link>
    </header>
  );
};
