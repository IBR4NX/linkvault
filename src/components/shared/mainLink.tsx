import { SITE_URL } from "@/lib/constants";
import { cn } from "cn";
import Link from "next/link";
import type { ComponentProps } from "react";

type MainLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  siteUrl?:string;
  href: `/${string}`;
  className?:string;
};

export default function MainLink({ href,className,siteUrl=SITE_URL, ...props }: MainLinkProps) {
  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_MAIN_URL is not configured");
  }

  return <Link href={`${siteUrl}${href}`} className={cn("hover:underline transition-colors hover:text-primary ",className)} {...props} />;
}