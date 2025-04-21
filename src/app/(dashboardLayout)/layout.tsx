import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";
// import logo from "@/assets/logo.png";


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
      <head>
        <link rel="icon" href="../../assets/logo.png" type="image/png" />

        <link rel="icon" href="@/assets/logo.png" type="image/png" />
        
      </head>
    

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <main>{children}</main>
          <ToastContainer position="top-center" autoClose={2000} />
      </body>
    </html>
  );
}
