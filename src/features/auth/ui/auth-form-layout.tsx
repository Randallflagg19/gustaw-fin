import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import React from "react";

export function AuthFormLayout({
  actions,
  description,
  fields,
  title,
  link,
  action,
  error,
}: {
  title: string;
  description: string;
  fields: React.ReactNode;
  actions: React.ReactNode;
  link: React.ReactNode;
  error: React.ReactNode;
  action: (formData: FormData) => void;
}) {
  return (
    <Card className="w-full max-w-md rounded-[2rem] border border-[#b88d4f]/40 bg-[#120d0a]/85 py-0 text-white shadow-[0_0_50px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <CardHeader className="px-8 pb-4 pt-8 text-center">
        <p className="mb-3 text-[0.72rem] uppercase tracking-[0.38em] text-[#d7b26d]">
          Celestial Access
        </p>

        <h1
          className="text-4xl leading-[1.08] text-white"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            textShadow: "0 2px 18px rgba(0,0,0,0.38)",
          }}
        >
          {title}
        </h1>

        <p className="mt-3 text-base leading-7 text-zinc-300">{description}</p>
      </CardHeader>

      <CardContent className="px-8 pb-6">
        <form action={action} className="space-y-5">
          {fields}
          {error}
          {actions}
        </form>
      </CardContent>

      <CardFooter className="flex justify-center px-8 pb-8 pt-0">
        {link}
      </CardFooter>
    </Card>
  );
}
