import Link from "next/link";
import React from "react";

export function AuthLink({
  url,
  linkText,
  text,
}: {
  text: string;
  linkText: string;
  url: string;
}) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-zinc-400">
      <span>{text}</span>
      <Link
        href={url}
        className="font-medium text-[#e1bb72] underline decoration-[#e1bb72]/35 underline-offset-4 hover:text-[#f0cc8c]"
      >
        {linkText}
      </Link>
    </p>
  );
}
