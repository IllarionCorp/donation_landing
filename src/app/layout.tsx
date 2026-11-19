import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Поддержать меня — Miata Club",
  description: "Помоги собрать на полуслики к гоночному сезону.",
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
