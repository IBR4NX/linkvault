export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://server-market-yemen.vercel.app/api";
export const SITE_URL = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}`.replace(/\/+$/, "");
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "";
export const SITE_NAME_EN = process.env.NEXT_PUBLIC_SITE_NAME_EN ?? "";
export const AUTHOR_NAME = {ar: process.env.AUTHOR_NAME ?? "",en:process.env.AUTHOR_NAME_EN??"" };
export const GOOGLE_CLIENT = {
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
};
export const LOCALE = process.env.NEXT_PUBLIC_LOCALE ?? "ar";
export function absoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
