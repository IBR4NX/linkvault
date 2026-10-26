function getENV(val: string | undefined,def:string="constant:20-getENV=null") {
  return val ?? def;
}
export const API_URL = process.env.API_URL ?? "https://server-market-yemen.vercel.app/api";
export const SITE_URL = `${process.env.SITE_URL || "http://localhost:3000"}`.replace(/\/+$/, "");
export const SITE_NAME = process.env.SITE_NAME ?? "";
export const SITE_NAME_EN = process.env.SITE_NAME_EN ?? "";
export const AUTHOR = {
  name: {
    ar: getENV(process.env.AUTHOR_NAME, "ابراهيم المخلافي"),
    en: getENV(process.env.AUTHOR_NAME_EN, "ibrahim Al-Mekhlafi"),
  },
  url: "https://ibrahim.ibovs.com",
};
export const SITE = {
  name: {
    ar: getENV(process.env.SITE_NAME),
    en: getENV(process.env.SITE_NAME_EN),
  },
  url: getENV(process.env.SITE_URL),
  api: getENV(process.env.API_URL),
  locale: getENV(process.env.LOCALE,"ar"),
};
export const SMTP = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }
};
export const GOOGLE_CLIENT = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
};
export function absoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
