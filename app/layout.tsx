import type { Metadata } from "next";
import { Inter } from "next/font/google";

import {
  APP_BASE_URL,
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE,
} from "@/lib/constants/app";
import "@/assets/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const defaultTitle = `${APP_TITLE} - ${APP_NAME}`;

export const metadata: Metadata = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_BASE_URL),
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
