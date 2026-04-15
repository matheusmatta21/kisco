import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Anton, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-mono-display" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Malinha PT.2",
  description: "vem aí",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, anton.variable, robotoMono.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
