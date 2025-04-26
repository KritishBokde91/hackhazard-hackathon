import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-950/20 via-blue-950/40 to-slate-900/30 relative md:overflow-auto`}
      >
        <Providers
          attribute="class"
          enableSystem
          disableTransitionOnChange>
          <div className="w-72 h-72 rounded-full bg-blue-600/30 blur-[128px] absolute  left-5 top-0 z-[-1]" />
          <div className="w-72 h-72 rounded-full bg-blue-600/20 blur-[128px] absolute  left-32 top-[30%] z-[-1]" />
          <div className="w-72 h-72 rounded-full bg-blue-600/20 blur-[128px] absolute  left-40 top-[70%] z-[-1]" />
          <div className="w-72 h-72 rounded-full bg-blue-600/20 blur-[128px] absolute  left-20 top-[50%] z-[-1]" />
          <div className="w-72 h-72 rounded-full bg-blue-600/30 blur-[128px] absolute  right-0 bottom-[20%] z-[-1]" />
          <Navbar />
          <div className="container mx-auto px-4 pt-16">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
