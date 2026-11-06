import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, absoluteUrl } from "@/lib/constants";
export { absoluteUrl };

export interface SeoProps {
  baseUrl?: string;
  canonicalPath?: string;
  ignorePath?:boolean;
  ignoreImgAbsoluteUrl?:boolean;
  description: string;
  image?: string;
  noindex?: boolean;
  title: string;
  type?: "website" | "article";
}
interface p{
  metadata:Metadata
}
export function GetSEO({...props}: SeoProps): p {
  return{metadata:createSeo({...props})}
}

export function createSeo({
  baseUrl = SITE_URL,
  canonicalPath = "/",
  ignorePath=false,
  description,
  image = "/favicons/og-image.png",
  ignoreImgAbsoluteUrl=false,
  noindex = false,
  title,
  type = "website",
  
}: SeoProps): Metadata {
  const fullTitle = createTitle(title);
  const canonical = ignorePath?canonicalPath: absoluteUrl(canonicalPath);
  const imageUrl =ignoreImgAbsoluteUrl?image: absoluteUrl(image);
  const date = new Date().toISOString();
  // console.log(canonical)
  return {
    // SEO
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: generateKeywords(title, description),
    alternates: {
      canonical,
      languages:{ar:SITE_URL},
    },

    robots: {
      index: !noindex,
      follow: !noindex,
    },

    // Open Graph
    openGraph: {
      type,
      locale: "ar",
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    applicationName: SITE_NAME,
    other: {
      title: title,
      pageTitle: fullTitle+" | "+SITE_NAME,
      where: generateWhere(title, description),
      topics: title,
      poblishedDate: date,
      lastModified: date,
      lastDate: date,
      source: SITE_NAME,
      "msapplication-TileColor": "#0F172A",
      "theme-color": "#0F172A",
    },
  }
}

function createTitle(title: string): string {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    return SITE_NAME;
  }

  const escapedSiteName = SITE_NAME.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const normalizedTitle = cleanTitle.replace(/\s*[|–—-]\s*/g, " | ").trim();

  const titleWithoutSiteName = normalizedTitle
    .replace(new RegExp(`\\s*-\\s*${escapedSiteName}$`, "i"), "")
    .trim();

  if (!titleWithoutSiteName) {
    return SITE_NAME;
  }

  return `${titleWithoutSiteName} | ${SITE_NAME}`;
}


function generateKeywords(title?: string, description?: string): string[] {
  const text = `${title ?? ""} ${description ?? ""}`;

  const stopWords = new Set([
    "في", "من", "على", "إلى", "عن", "مع", "هذا", "هذه",
    "ذلك", "التي", "الذي", "هو", "هي", "و", "أو", "ما",
    "the", "a", "an", "in", "on", "at", "to", "for",
    "of", "and", "or", "is", "are", "with",
  ]);

  return [
    ...new Set(
      text
        .replace(/[^\p{L}\p{N}\s-]/gu, " ")
        .split(/\s+/)
        .map((word) => word.trim())
        .filter(
          (word) =>
            word.length > 2 &&
            !stopWords.has(word.toLowerCase()),
        ),
    ),
  ];
}

function generateWhere(title?: string, description?: string): string {
  const text = `${title ?? ""} ${description ?? ""}`;

  const locations = [
    "اليمن",
    "صنعاء",
    "تعز",
    "عدن",
    "الشرق الأوسط",
  ];

  return locations.filter((location) => text.includes(location)).join(", ")+", اليمن";
}



