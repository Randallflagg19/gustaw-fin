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
    <p className="text-sm text-primary/50">
      {text}{" "}
      <Link href={url} className="font-medium text-primary">
        {linkText}
      </Link>
    </p>
  );
}
