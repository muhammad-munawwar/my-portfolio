import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "MHA Codex | Muhammad Munawwar - Full Stack & Custom App Developer",
  description: "Premium developer portfolio showcasing specialized CRM/ERP solutions, modern web platforms, mobile apps, and desktop software built using React, Next.js, and Electron.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
