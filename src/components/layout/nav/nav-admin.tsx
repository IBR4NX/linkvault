"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { IconLayoutDashboard, IconUsers, IconLink, IconChartBar, IconHistory } from "@tabler/icons-react";

const navigation = [
  { title: "لوحة الإدارة", url: "/admin", icon: IconLayoutDashboard },
  { title: "إدارة المستخدمين", url: "/admin/users", icon: IconUsers },
  { title: "إدارة الروابط", url: "/admin/links", icon: IconLink },
  { title: "التقارير والإحصائيات", url: "/admin/analytics", icon: IconChartBar },
  { title: "سجل النشاطات", url: "/admin/audit-logs", icon: IconHistory },
];
export function AdminNavigation() {
  const pathname = usePathname();


  return (
    <SidebarMenu>
      {navigation.map((item) => {
        const isActive = pathname === item.url || (item.url !== "/admin" && pathname.startsWith(`${item.url}/`));

        const Icon = item.icon;

        return (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton  size={'lg'}  className="w-full text-lg"
              isActive={isActive}
              tooltip={item.title}
              render={
                <Link href={item.url} aria-current={isActive ? "page" : undefined}>
                  <Icon />
                  <span>{item.title}</span>
                </Link>
              }
            />
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
