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
    <p className="text-sm text-zinc-400">
      {text}{" "}
      <Link
        href={url}
        className="font-medium text-[#e1bb72] underline decoration-[#e1bb72]/35 underline-offset-4 hover:text-[#f0cc8c]"
      >
        {linkText}
      </Link>
    </p>
  );
}
