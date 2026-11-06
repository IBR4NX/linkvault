export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

export interface RouteConfig {
  path: string;
  label: string;
}
