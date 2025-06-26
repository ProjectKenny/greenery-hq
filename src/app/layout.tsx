import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreeneryHQ - Directory of Green Tech Companies",
  description: "Discover and connect with green technology companies driving climate solutions, renewable energy, and sustainable innovation worldwide.",
  keywords: ["green tech", "renewable energy", "climate solutions", "sustainable technology", "clean energy", "environmental technology"],
  authors: [{ name: "GreeneryHQ" }],
  openGraph: {
    title: "GreeneryHQ - Directory of Green Tech Companies",
    description: "Discover and connect with green technology companies driving climate solutions worldwide.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreeneryHQ - Directory of Green Tech Companies",
    description: "Discover and connect with green technology companies driving climate solutions worldwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
