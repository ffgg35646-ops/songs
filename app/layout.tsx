import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SONORA — اصنع موسيقاك بالذكاء الاصطناعي",
  description:
    "حوّل فكرتك وكلماتك إلى تجربة موسيقية باستخدام محرك ACE-Step المفتوح المصدر.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
