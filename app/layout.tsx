import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/assets/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eVoluir",
  description: "Uma moderna plataforma e-commerce com Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
