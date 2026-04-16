"use client";

import Image from "next/image";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Cat } from "@/shared/ui/icons/cat";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/css";
import { useEffect } from "react";
import useUserStore from "@/entities/user/model/user-store";
import { useRouter } from "next/navigation";

type Props = {
  userFromServer: {
    id: string;
    login: string | null;
    role: "USER" | "ADMIN";
  } | null;
};

export const HeaderClient = ({ userFromServer }: Props) => {
  const { setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (userFromServer) {
      setUser(userFromServer);
    }
  }, [userFromServer, setUser]);

  const handleBookingClick = () => {
    router.push("/booking");
  };

  return (
    <header className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6">
      <div className="flex flex-col gap-6">
        <h1
          className="max-w-4xl text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            textShadow: "0 2px 16px rgba(0,0,0,0.55)",
          }}
        >
          Этот сайт посвящён самому важному существу в галактике.
        </h1>

        <div className="flex flex-wrap gap-3">
          <Link href="/sign-in">
            <Button
              asChild
              variant="ghost"
              className={cn(
                "rounded-full border border-[#d8b06a] bg-[#f1cf83] px-5 py-3 text-black hover:bg-[#f5d892]",
              )}
              aria-label="Login"
            >
              <span className="inline-flex items-center gap-2 uppercase tracking-[0.18em]">
                <PawPrint className="h-4 w-4" />
                Войти в культ
              </span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            onClick={handleBookingClick}
            className={cn(
              "rounded-full border border-[#a8844d] bg-black/20 px-5 py-3 text-[#f3d89b] hover:bg-black/35",
            )}
            aria-label="Записаться на прием"
            title="Записаться погладить кота - 1000₽"
          >
            <span className="inline-flex items-center gap-2 uppercase tracking-[0.18em]">
              <Cat className="flex items-center justify-center text-[#f3d89b]" />
              Записаться на аудиенцию
            </span>
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-[#b88d4f]/60 bg-black/20 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
        <Image
          src="/images/hero-gustaw-cosmos.png"
          alt="Густав в космической атмосфере"
          width={1400}
          height={900}
          priority
          className="h-auto w-full object-cover"
        />
      </div>
    </header>
  );
};
