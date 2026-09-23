import type { Metadata } from "next";
import "./globals.css";
import { Background } from "@/shared/ui/background";
import { Orbitron } from "next/font/google";
import { QueryProvider } from "@/shared/providers/query-provider";
import { AuthProvider } from "@/shared/providers/session-provider";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gustaw.ru"),

  title: "Густав. Великий, пушистый, космический",
  description:
    "Личная галерея Густава — фотографии, история и немного космического величия.",

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://gustaw.ru",
    siteName: "Густав",
    title: "Густав. Великий, пушистый, космический",
    description:
      "Личная галерея Густава — фотографии, история и немного космического величия.",
    images: [
      {
        url: "/images/gustaw-social-preview-v2.png",
        alt: "Густав — чёрный кот с золотыми глазами",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Густав. Великий, пушистый, космический",
    description:
      "Личная галерея Густава — фотографии, история и немного космического величия.",
    images: ["/images/gustaw-social-preview-v2.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={orbitron.variable}>
      <body>
        <AuthProvider>
          <QueryProvider>
            <Background>{children}</Background>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

// Логинка надо чтобы при обновлении страницы пользователь попадал в стор из лс

// Нормализовать кодовую базу для домена лайка (для сущности)

// Клиентские серверные компоненты почитать

// Разобраться со стором

// Лайки перенести на стор обновляется берем из бд юзеффект (опционально должно происходить только после прогрузки картинок)
