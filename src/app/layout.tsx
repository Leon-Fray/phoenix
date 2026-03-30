import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guard Rep | Reputation Management",
  description: "Results-driven reputation management specifically designed for local businesses. We rebuild your brand, mitigate bad reviews, and accelerate your growth.",
  openGraph: {
    title: "Guard Rep | Reputation Management",
    description: "Results-driven reputation management...",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
