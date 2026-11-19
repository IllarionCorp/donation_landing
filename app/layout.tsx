import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Поддержать меня — маленький донат, большое вдохновение",
  description:
    "Если тебе нравится то, что я делаю, поддержи меня донатом. Любая сумма помогает создавать больше.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
