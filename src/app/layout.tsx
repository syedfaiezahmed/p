import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/ui/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prospera KSA - Financial & Digital Business Consulting",
  description:
    "Expert financial, accounting, and business advisory services empowering companies across Saudi Arabia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="pt-[88px] sm:pt-[104px] lg:pt-[96px]">{children}</div>
      </body>
    </html>
  );
}