import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });
const bn = Noto_Sans_Bengali({ subsets: ["bengali"], variable: "--font-bn" });

export const metadata: Metadata = {
  title: "FluentMama – Learn spoken English",
  description: "AI-powered, gamified spoken English learning for Bengali speakers.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dm.variable} ${bn.variable} font-sans`}>{children}</body>
    </html>
  );
}
