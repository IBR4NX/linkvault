import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { cn } from "@/utils/cn";
import { redirect } from "next/navigation";
import { AUTHOR_NAME, SITE_NAME, SITE_NAME_EN, SITE_URL } from "@/lib/constants";

const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} | ${SITE_NAME_EN}`,
  description: "نطاق مخلاقي يديرة ابراهيم دبوان المخلافي",
  applicationName: SITE_NAME,
  appleWebApp: {
    title: "",
  },
  alternates: {
    canonical: new URL(SITE_URL),
  },
  other: {
    author: AUTHOR_NAME.ar,
    websiteName: SITE_NAME,
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
          "@context": "https://schema.org", "@type": "WebSite", "name": {SITE_NAME}, "author":{AUTHOR_NAME.ar}
          alternateName:[{SITE_NAME_EN}, {AUTHOR_NAME.en}], , "url": "https://www.ibovs.com/" inLanguage: "ar-AR",
        </script>
      </head>
      <body className="min-h-full bg-background transition-colors duration-300 flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
