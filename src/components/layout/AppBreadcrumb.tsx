"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItem as BreadcrumbItemType } from "@/types/common.types";
import { generateBreadcrumbs, generateBreadcrumbSchema } from "@/utils/breadcrumb.utils";
import { cn } from "@/utils/cn";
import { UI_VARIANTS } from "../styles/variants";

interface AppBreadcrumbProps {
  items?: BreadcrumbItemType[];
  customLabels?: Record<string, string>;
  className?: string;
}

export default function AppBreadcrumb({ items, customLabels, className }: AppBreadcrumbProps) {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const breadcrumbs = items ?? generateBreadcrumbs(pathname, customLabels);
  const schemaData = generateBreadcrumbSchema(breadcrumbs);

  return (
    <Breadcrumb className={cn("py-3", className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <BreadcrumbList className={UI_VARIANTS.text.muted}>
        <BreadcrumbItem>
          <BreadcrumbLink
            render={
              <Link href="/" className={UI_VARIANTS.transition}>
                الرئيسية
              </Link>
            }
          />
        </BreadcrumbItem>

        {breadcrumbs.map((item) => (
          <React.Fragment key={item.href}>
            <BreadcrumbSeparator className="rtl:rotate-180" />
            <BreadcrumbItem>
              {item.isCurrent ? (
                <BreadcrumbPage className="font-semibold">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  render={
                    <Link href={item.href} className={UI_VARIANTS.transition}>
                      {item.label}
                    </Link>
                  }
                />
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
