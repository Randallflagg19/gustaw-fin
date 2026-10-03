"use client";

import Image from "next/image";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Cat } from "@/shared/ui/icons/cat";
import { Button } from "@/shared/ui/button";
import { useEffect } from "react";
import useUserStore from "@/entities/user/model/user-store";
import { useRouter } from "next/navigation";
import { editorialHeadingFont } from "@/shared/ui/typography";

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
    setUser(userFromServer);
  }, [userFromServer, setUser]);

  const handleBookingClick = () => {
    router.push("/booking");
  };

  return (
    <header className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6">
      <div className="flex flex-col gap-6">
        <h1
          className="max-w-5xl text-3xl font-medium leading-tight text-[#F4E9D2] sm:text-5xl md:text-6xl"
          style={{
            ...editorialHeadingFont,
            textShadow: "0 2px 16px rgba(0,0,0,0.55)",
          }}
        >
          Этот сайт посвящён самому
          <br className="hidden lg:block" /> важному существу в галактике.
        </h1>

        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            variant="cosmicPrimary"
            size="control"
            aria-label="Войти в культ"
          >
            <Link href="/sign-up">
              <span className="inline-flex items-center gap-2 uppercase tracking-[0.16em]">
                <PawPrint className="h-4 w-4" />
                Войти в культ
              </span>
            </Link>
          </Button>

          <Button
            variant="cosmicOutline"
            size="control"
            onClick={handleBookingClick}
            aria-label="Записаться на аудиенцию"
            title="Записаться погладить кота - 1000₽"
          >
            <span className="inline-flex items-center gap-2 uppercase tracking-[0.16em]">
              <Cat className="flex items-center justify-center text-[#f3d89b]" />
              Записаться на аудиенцию
            </span>
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-[#b88d4f]/60 bg-[#080604] shadow-[0_0_40px_rgba(0,0,0,0.35)]">
        <Image
          src="/images/hero-gustaw-cosmos.png"
          alt="Густав в космической атмосфере"
          width={1400}
          height={900}
          sizes="(min-width: 1200px) 1152px, calc(100vw - 32px)"
          priority
          fetchPriority="high"
          className="h-auto w-full object-cover"
        />
      </div>
    </header>
  );
};
