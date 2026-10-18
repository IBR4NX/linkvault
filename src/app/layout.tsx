import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { Toaster } from "@/components/ui/toast";

const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LinkVault — Your private link library",
  description: "Save the web in one calm, private place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" suppressHydrationWarning className={`${readexPro.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
                  <Toaster />

      </body>
    </html>
  );
}
