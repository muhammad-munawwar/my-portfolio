import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Muhammad Munawwar | Full Stack & MERN Developer",
  description: "Premium developer portfolio of Muhammad Munawwar, showcasing specialized CRM/ERP solutions, modern web platforms, mobile apps, and desktop software built using React, Next.js, and Electron.",
  keywords: [
    "Muhammad Munawwar",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Frontend Engineer",
    "Software Engineer",
    "Web Development",
    "Portfolio",
    "Karachi",
    "Pakistan"
  ],
  authors: [{ name: "Muhammad Munawwar" }],
  creator: "Muhammad Munawwar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Muhammad Munawwar | Full Stack Developer",
    description: "Premium developer portfolio showcasing specialized CRM/ERP solutions, modern web platforms, mobile apps, and desktop software.",
    siteName: "Muhammad Munawwar Portfolio",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Munawwar Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Munawwar | Full Stack Developer",
    description: "Premium developer portfolio showcasing specialized CRM/ERP solutions, modern web platforms, mobile apps, and desktop software.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
