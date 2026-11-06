"use client";

import * as React from "react";
import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link,
  Lock,
  Menu,
  MessageCircle,
  Paintbrush,
  Settings,
  Video,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toggle } from "@/components/ui/toggle";

const data = {
  nav: [
    { name: "الإشعارات", icon: Bell },
    { name: "التنقل", icon: Menu },
    { name: "الرئيسية", icon: Home },
    { name: "المظهر", icon: Paintbrush },
    { name: "الرسائل والوسائط", icon: MessageCircle },
    { name: "اللغة والمنطقة", icon: Globe },
    { name: "إمكانية الوصول", icon: Keyboard },
    { name: "تحديد الكل كمقروء", icon: Check },
    { name: "الصوت والفيديو", icon: Video },
    { name: "الحسابات المرتبطة", icon: Link },
    { name: "الخصوصية وإمكانية الظهور", icon: Lock },
    { name: "إعدادات متقدمة", icon: Settings },
  ],
};

export function SettingsDialog({ children, render }: { children?: React.ReactNode; render?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {render}
      <DialogContent className="overflow-hidden z-50 p-0 h-full md:max-h-96 md:max-w-175 lg:max-w-200">

        <SidebarProvider dir="rtl" className="">
          <Sidebar dir="rtl" side="right" className=" z-50" collapsible="offcanvas">
            <SidebarHeader></SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton dir="rtl" isActive={item.name === "Messages & media"}>
                          <item.icon />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
              <header 
                dir="rtl"
                className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
              >
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className={'z-50 bg-background'} />

                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">ألإدارة</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>------</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="aspect-video max-w-3xl rounded-xl bg-muted/50" />
                ))}
              </div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
