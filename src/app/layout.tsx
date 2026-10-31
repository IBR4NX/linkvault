import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { cn } from "@/utils/cn";
import { redirect } from "next/navigation";
import { AUTHOR, SITE, SITE_NAME, SITE_URL } from "@/lib/constants";
import { JsonLd } from "@/lib/seo/json-ld";

const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} | ${SITE.name.en}`,
  description: "نطاق مخلاقي يديرة ابراهيم دبوان المخلافي",
  applicationName: SITE_NAME,
  appleWebApp: {
    title: SITE_NAME,
  },
  alternates: {
    canonical: new URL(SITE_URL),
  },
  other: {
    author: AUTHOR.name.ar,
    websiteName: SITE_NAME,
  },
};
const js = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  author: AUTHOR.name.ar,
  alternateName: [SITE.name.en, AUTHOR.name.en],
  url:SITE_URL,
  inLanguage: "ar-AR",
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
        <JsonLd data={js}/>
      </head>
      <body className="min-h-full bg-background transition-colors duration-300 flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
