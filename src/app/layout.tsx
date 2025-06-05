import type { Metadata } from "next";
import "./styles/globals.scss";

export const metadata: Metadata = {
  title: "Website Synergy"
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
