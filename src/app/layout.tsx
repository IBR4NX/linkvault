import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { cn } from "@/utils/cn";
import { redirect } from "next/navigation";

const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ابراهيم المخلافي  ",
  applicationName: "موقعك",
  appleWebApp: {
    title: "ibrahim Al-Mekhlafi",
  },
  other: {
    // title: "love",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // redirect('https://prices.ibovs.com')
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", "font-sans", readexPro.variable)}
    >
      <head>
        <script type="application/ld+json">
          "@context": "https://schema.org", "@type": "WebSite", "name": "شركة ابراهيم المخلافي", "url":
          "https://www.ibovs.com/"
        </script>
      </head>
      <body className="min-h-full bg-background transition-colors duration-300 flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
