"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItem as BreadcrumbItemType } from "@/types/common.types";
import { generateBreadcrumbs, generateBreadcrumbSchema } from "@/utils/breadcrumb.utils";
import { UI_VARIANTS } from "@/components/styles/variants";
import { cn } from "@/utils/cn";

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
  const hasMultipleItems = breadcrumbs.length > 1;

  return (
    <Breadcrumb className={cn("py-3 overflow-hidden", className)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <BreadcrumbList className={cn(UI_VARIANTS.text.muted, UI_VARIANTS.singleLine)}>
        <BreadcrumbItem className="shrink-0">
          <BreadcrumbLink
            render={
              <Link href="/" className={UI_VARIANTS.transition}>
                الرئيسية
              </Link>
            }
          />
        </BreadcrumbItem>

        {/* في الموبايل فقط: إظهار (...) إذا كان المسار يتكون من أكثر من عنصر */}
        {hasMultipleItems && (
          <>
            <BreadcrumbSeparator className="rtl:rotate-180 sm:hidden shrink-0" />
            <BreadcrumbItem className="sm:hidden shrink-0">
              <BreadcrumbEllipsis className="h-4 w-4" />
            </BreadcrumbItem>
          </>
        )}

        {breadcrumbs.map((item) => {
          // في الموبايل نخفي العناصر الوسطى ونبقي العنصر الأخير فقط
          const hideOnMobile = hasMultipleItems && !item.isCurrent ? "hidden sm:inline-flex" : "";

          return (
            <React.Fragment key={item.href}>
              <BreadcrumbSeparator className={cn("rtl:rotate-180 shrink-0", hideOnMobile)} />
              <BreadcrumbItem className={cn("min-w-0", hideOnMobile)}>
                {item.isCurrent ? (
                  <BreadcrumbPage className={cn("font-semibold", UI_VARIANTS.truncateItem)}>
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={
                      <Link href={item.href} className={cn(UI_VARIANTS.transition, UI_VARIANTS.truncateItem)}>
                        {item.label}
                      </Link>
                    }
                  />
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
