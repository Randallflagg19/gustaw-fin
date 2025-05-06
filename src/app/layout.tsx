import type { Metadata } from "next";
import "./globals.css";
import { SideMenu } from "@/features/gallery/containers/SideMenu";

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
        <div className="flex">
          <SideMenu />

          <div className="w-full px-4 pt-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
// 2 23
