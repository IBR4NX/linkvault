import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { cn } from "@/utils/cn";

const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "دليل السوق",
  applicationName: "د",
  appleWebApp: {
    title: "ibrahim Al-Mekhlafi",
  },
  other: {
    // title: "love",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", "font-sans", readexPro.variable)}
    >
      <head></head>
      <body className="min-h-full bg-background transition-colors duration-300 flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
