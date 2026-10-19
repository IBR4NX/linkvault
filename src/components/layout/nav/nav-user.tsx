"use client";

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

interface NavUserProps {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified?: boolean;
    image?: string | null | undefined;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  return (
    <SidebarMenu dir="rtl">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar size="lg" className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image ?? ""} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-right gap-1 text-sm leading-tight">
                  <span className="truncate flex gap-1 font-medium">
                    <p className="truncate">{user.name}</p>
                    {user.emailVerified ? (
                      <BadgeCheck className="size-4 text-green-500" />
                    ) : (
                      <BadgeCheck className="size-4 text-red-500" />
                    )}
                  </span>

                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="mr-auto size-4" />
              </SidebarMenuButton>
            }
          />

          <DropdownMenuContent
            dir="rtl"
            className="w-56 min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-2 py-2 text-right text-sm">
                  <Avatar className="h-9 w-9 rounded-lg">
                    <AvatarImage src={user.image ?? ""} alt={user.name} />

                    <AvatarFallback className="rounded-lg">{user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-right leading-tight">
                    <span className="truncate font-medium">{user.name}</span>

                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                {user.emailVerified ? (
                  <BadgeCheck className="size-4 text-green-500" />
                ) : (
                  <BadgeCheck className="size-4 text-red-500" />
                )}

                <span>{user.emailVerified ? "البريد الإلكتروني موثّق" : "البريد الإلكتروني غير موثّق"}</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Sparkles className="size-4" />
                <span>الترقية إلى الاحترافية</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/account")}>
                <BadgeCheck className="size-4" />
                <span>الحساب</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <CreditCard className="size-4" />
                <span>الفوترة والاشتراكات</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Bell className="size-4" />
                <span>الإشعارات</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/");
                      router.refresh();
                    },
                  },
                })
              }
            >
              <LogOut className="size-4" />
              <span>تسجيل الخروج</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
