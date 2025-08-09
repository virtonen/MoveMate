import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MoveMate — Your Personalized Relocation Assistant",
  description:
    "Effortlessly create your custom moving dashboard—guiding you through neighborhood insights, housing listings, and application processes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-[#0e0720] text-zinc-100 antialiased">
        <div className="min-h-screen bg-[radial-gradient(60%_70%_at_50%_0%,rgba(68,6,95,0.35)_0%,transparent_70%)]">
          {children}
        </div>
      </body>
    </html>
  );
}
