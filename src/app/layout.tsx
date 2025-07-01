import type { Metadata } from "next";
import "./globals.css";
import { Background } from "@/shared/ui/background";
import { Orbitron } from "next/font/google";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} font-sans antialiased dark min-h-screen flex flex-col grow`}>
        <Background>
          <div className="w-full px-4 pt-8">{children}</div>
        </Background>
      </body>
    </html>
  );
}

// Логинка надо чтобы при обновлении страницы пользователь попадал в стор из лс

// Нормализовать кодовую базу для домена лайка (для сущности)

// Клиентские серверные компоненты почитать

// Разобраться со стором

// Лайки перенести на стор обновляется берем из бд юзеффект (опционально должно происходить только после прогрузки картинок)
