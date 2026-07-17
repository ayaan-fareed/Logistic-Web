import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "United Carriers | Every leg of the journey",
  description: "Global freight logistics with complete operational ownership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
