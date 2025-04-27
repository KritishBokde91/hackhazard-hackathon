import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import AutoToast from "@/components/auto-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coding Geeks",
  description: "Make Your Frontend Skill Better",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen overflow-x-hidden`}
      >
        <Providers
          attribute="class"
          enableSystem
          disableTransitionOnChange>
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
            <div className="absolute w-1/4 md:w-72 aspect-square rounded-full bg-blue-600/30 blur-[80px] md:blur-[128px] top-0 left-[5%]" />
            <div className="absolute w-1/4 md:w-72 aspect-square rounded-full bg-blue-600/20 blur-[80px] md:blur-[128px] top-[30%] left-[15%] md:left-[20%]" />
            <div className="absolute w-1/4 md:w-72 aspect-square rounded-full bg-blue-600/20 blur-[80px] md:blur-[128px] top-[70%] left-[18%] md:left-[25%]" />
            <div className="absolute w-1/4 md:w-72 aspect-square rounded-full bg-blue-600/20 blur-[80px] md:blur-[128px] top-[50%] left-[8%] md:left-[12%]" />
            <div className="absolute w-1/4 md:w-72 aspect-square rounded-full bg-blue-600/30 blur-[80px] md:blur-[128px] bottom-[20%] right-0" />
          </div>

          <Navbar />
          <div className="container mx-auto px-4 pt-16">
            {children}
          </div>
          <AutoToast />
        </Providers>
      </body>
    </html>
  );
}