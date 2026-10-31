import { BreadcrumbItem } from "@/types/common.types";

// قاموس مسارات المشروع (عدّل أو أضف مسارات مشروعك هنا)
export const ROUTE_LABELS: Record<string, string> = {
  dashboard: "لوحة التحكم",
  settings: "الإعدادات",
  profile: "الملف الشخصي",
  users: "المستخدمين",
};

export function formatSegmentLabel(segment: string): string {
  const decoded = decodeURIComponent(segment);
  return ROUTE_LABELS[decoded] || decoded.replace(/-/g, " ");
}

export function generateBreadcrumbs(pathname: string, customLabels?: Record<string, string>): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isCurrent = index === segments.length - 1;
    const label = customLabels?.[segment] || formatSegmentLabel(segment);

    return { label, href, isCurrent };
  });
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl = "") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: `${baseUrl}/`,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: `${baseUrl}${item.href}`,
      })),
    ],
  };
}
