import { SignInForm } from "@/features/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход — Густав",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignIn() {
  return <SignInForm />;
}
