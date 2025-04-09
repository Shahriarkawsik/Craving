import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ToastContainer } from "react-toastify";
import NextAuthSessionProvider from "@/Providers/NextAuthSessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Craving",
  description: "A food delivery app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <header>
            <Navbar />
          </header>
          <main className="min-h-[calc(100vh-68px)]">{children}</main>
          <ToastContainer position="top-center" autoClose={2000} />
          <Footer></Footer>
      </body>
        </NextAuthSessionProvider>
    </html>
  );
}
