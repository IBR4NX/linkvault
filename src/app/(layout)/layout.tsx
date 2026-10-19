import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/auth-session";
import { Header } from "@/components/layout/Header";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { IconLayoutDashboard, IconUsers, IconLink, IconChartBar, IconHistory } from "@tabler/icons-react";
import Footer from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";
import { NavUser } from "@/components/layout/nav/nav-user";
import { IconAlarm, IconHelp, IconHome, IconSearch, IconSettings } from "@tabler/icons-react";
import { NavSecondary } from "@/components/layout/nav/nav-secondary";
import { AdminNavigation } from "@/components/layout/nav/nav-admin";
export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  return (
    <>
      <SidebarProvider
        dir="rtl"
        className="  relative   "
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <Sidebar dir="rtl" side="right" className=" z-20" collapsible="offcanvas">
          <SidebarHeader>
            {session.user && <NavUser user={session.user} />}
            <Separator />
          </SidebarHeader>
          <SidebarContent dir="rtl" className=" text-2xl">
            <NavSecondary items={navigation} className="" />
            {session.user.role === "admin" && <AdminNavigation />}
            <NavSecondary items={navSecondary} className="mt-auto" />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className=" relative bg-transparent">
          <Header></Header>
          <div className="items-center justify-center    w-full h-full ">
            {children}
            <Footer />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

const navigation = [
  { title: "الرئيسية", url: "/", icon: IconHome },
  { title: "خدمات", url: "#", icon: IconAlarm },
];
const navigationAdmin = [
  { title: "لوحة الإدارة", url: "/admin", icon: IconLayoutDashboard },
  { title: "إدارة المستخدمين", url: "/admin/users", icon: IconUsers },
  { title: "إدارة الروابط", url: "/admin/links", icon: IconLink },
  { title: "التقارير والإحصائيات", url: "/admin/analytics", icon: IconChartBar },
  { title: "سجل النشاطات", url: "/admin/audit-logs", icon: IconHistory },
  { title: "إعدادات النظام", url: "/admin/settings", icon: IconSettings },
];

const navSecondary = [
  {
    title: "المساعدة",
    url: "#",
    icon: IconHelp,
  },
  {
    title: "الإعدادات",
    url: "#",
    icon: IconSettings,
  },
  { title: "الحساب الشخصي", url: "/account", icon: IconUsers },
];