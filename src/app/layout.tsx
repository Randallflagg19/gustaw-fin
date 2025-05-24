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

// Логинка надо чтобы при обновлении страницы пользователь попадал в стор из лс

// Нормализовать кодовую базу для домена лайка (для сущности)

// Клиентские серверные компоненты почитать

// Разобраться со стором

// Лайки перенести на стор обновляется берем из бд юзеффект (опционально должно происходить только после прогрузки картинок)
