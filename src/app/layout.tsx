import type { Metadata, Viewport } from "next";
import "./styles/globals.scss";

export const metadata: Metadata = {
  title: "Website Synergy",
  icons: {
    icon: "/simulador/favicon.png",
    shortcut: "/simulador/favicon.png",
    apple: "/simulador/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
