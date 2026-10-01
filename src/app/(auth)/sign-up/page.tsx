import { SignUpForm } from "@/features/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация — Густав",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUp() {
  return <SignUpForm />;
}
