import React from "react";
import { editorialHeadingFont } from "@/shared/ui/typography";
import { cn } from "@/shared/lib/css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function AuthFormLayout({
  actions,
  description,
  fields,
  helper,
  title,
  link,
  action,
  error,
  className,
}: {
  title: string;
  description?: string;
  fields: React.ReactNode;
  helper?: React.ReactNode;
  actions: React.ReactNode;
  link: React.ReactNode;
  error: React.ReactNode;
  action: (formData: FormData) => void;
  className?: string;
}) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
      <section
        className={cn(
          "relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[#c79a50]/65 bg-[#100b08]/90 text-white shadow-[0_30px_90px_rgba(0,0,0,0.48)] backdrop-blur-md lg:grid-cols-[0.88fr_1.12fr]",
          className,
        )}
      >
        <div className="relative flex min-h-[15rem] flex-col justify-end overflow-hidden border-b border-[#8b6a3e]/35 px-6 pb-7 pt-20 sm:min-h-[19rem] sm:px-10 sm:py-10 lg:min-h-[42rem] lg:justify-center lg:border-b-0 lg:border-r lg:px-14">
          <div
            aria-hidden="true"
            className="cosmos-background absolute inset-0 scale-105 bg-cover bg-no-repeat opacity-80"
            style={{ backgroundPosition: "24% 72%" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(8, 6, 4, 0.3) 0%, rgba(8, 6, 4, 0.58) 58%, rgba(8, 6, 4, 0.9) 100%), linear-gradient(180deg, rgba(8, 6, 4, 0.2) 0%, rgba(8, 6, 4, 0.06) 48%, rgba(8, 6, 4, 0.62) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_18%_82%,rgba(225,187,114,0.26),transparent_38%),radial-gradient(circle_at_68%_16%,rgba(112,70,28,0.14),transparent_40%)]"
          />
          <Link
            href="/"
            className="group absolute left-6 top-5 z-20 inline-flex h-12 items-center gap-3 rounded-full border border-[#c79a50]/55 bg-black/25 py-1.5 pl-1.5 pr-5 text-[#f4e9d2] shadow-[0_8px_28px_rgba(0,0,0,0.24)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-200 hover:border-[#e1bb72] hover:bg-[#2a1b0d]/55 hover:shadow-[0_0_24px_rgba(225,187,114,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1bb72]/50 sm:left-10 sm:top-10 lg:left-14"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-[#c79a50]/45 bg-[#160f0a]/80 text-[#e1bb72] transition-transform duration-200 group-hover:-translate-x-0.5">
              <ArrowLeft aria-hidden="true" className="size-4" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[0.52rem] font-semibold uppercase tracking-[0.26em] text-[#bca57d]">
                Вернуться
              </span>
              <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] sm:text-xs">
                На главную
              </span>
            </span>
          </Link>
          <div className="relative z-10 flex min-h-[10rem] max-w-md flex-col justify-start sm:min-h-[15rem] lg:min-h-[18rem]">
            <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[#e1bb72] sm:mb-5 sm:text-xs sm:tracking-[0.42em]">
              Celestial Access
            </p>
            <h1
              className="text-4xl leading-[0.98] text-[#F4E9D2] sm:text-6xl lg:text-7xl"
              style={{
                ...editorialHeadingFont,
                textShadow: "0 3px 24px rgba(0,0,0,0.55)",
              }}
            >
              {title}
            </h1>
            <div className="mt-4 min-h-12 sm:mt-6 sm:min-h-16">
              {description ? (
                <p className="max-w-sm text-sm leading-6 text-[var(--cosmos-text-muted)] sm:text-lg sm:leading-7">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-7 sm:px-10 sm:py-9 lg:px-14 lg:py-12">
          <div className="mb-4 flex min-h-6 justify-start sm:mb-5">{link}</div>
          <div className="mb-4 min-h-12 text-sm leading-6 text-[var(--cosmos-text-muted)]">
            {helper}
          </div>
          <form action={action} className="space-y-4 sm:space-y-5">
            {fields}
            <div className="min-h-6">{error}</div>
            {actions}
          </form>
        </div>
      </section>
    </main>
  );
}
