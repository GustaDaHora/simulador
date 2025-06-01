import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Calculadora de Economia Solar",
  description: "Simule sua economia com energia solar personalizada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
