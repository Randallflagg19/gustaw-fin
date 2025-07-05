import type { Metadata } from "next";
import "./globals.css";
import { Background } from "@/shared/ui/background";
import { Orbitron } from "next/font/google";
import { QueryProvider } from "@/shared/providers/query-provider";

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: "Gustaw",
  description: "Gustaw's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={orbitron.variable}>
      <body>
        <QueryProvider>
          <Background>{children}</Background>
        </QueryProvider>
      </body>
    </html>
  );
}

// Логинка надо чтобы при обновлении страницы пользователь попадал в стор из лс

// Нормализовать кодовую базу для домена лайка (для сущности)

// Клиентские серверные компоненты почитать

// Разобраться со стором

// Лайки перенести на стор обновляется берем из бд юзеффект (опционально должно происходить только после прогрузки картинок)
