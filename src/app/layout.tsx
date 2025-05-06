import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Густав",
  description: "Сайт про кота",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-[url('/images/bg.png')] bg-repeat bg-fixed font-sans antialiased dark min-h-screen flex flex-col grow`}
      >
        <div className="w-full px-4 pt-8">{children}</div>
      </body>
    </html>
  );
}
