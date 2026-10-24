import { IconUsers, IconLink, IconUserPlus, IconUserOff, IconClock, IconExternalLink, Icon, IconCheck, IconBrandGoogle, IconMail } from "@tabler/icons-react";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

const numberFormatter = new Intl.NumberFormat("ar");

const dateFormatter = new Intl.DateTimeFormat("ar", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminPage() {
  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const lastWeek = new Date(now);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const [
    totalUsers,
    newUsers,
    bannedUsers,
    emailVerifiedUsers,
    totalGoogle,
    totalCredential,
    recentUsers,
    recentLinks,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    }),
    prisma.user.count({
      where: {
        banned: true,
      },
    }),
    prisma.user.count({
      where: {
        emailVerified: true,
      },
    }),
    prisma.account.count({ where: { providerId: "google" } }),
    prisma.account.count({ where: { providerId: "credential" } }),

    prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    }),

    prisma.link.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        url: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
  ]);

  const users = [
    {
      title: "إجمالي",
      value: totalUsers,
      description: "جميع الحسابات المسجلة",
      icon: IconUsers,
    },

    {
      title: "جدد",
      value: newUsers,
      description: "خلال آخر 7 أيام",
      icon: IconUserPlus,
    },
    {
      title: "الموثقة",
      value: emailVerifiedUsers,
      description: "جميع المستخدمين الموثقين",
      icon: IconCheck,
    },

    {
      title: "المحظورون",
      value: bannedUsers,
      description: "الحسابات المحظورة حاليًا",
      icon: IconUserOff,
    },
    {
      title: "بواسطة جوجل",
      value: totalGoogle,
      description: "المستخدمين بواسطة google",
      icon: IconBrandGoogle,
    },
    {
      title: "بواسطة email",
      value: totalCredential,
      description: "المستخدمين بواسطة email",
      icon: IconMail,
    },
  ];

  return (
    <main dir="rtl" className="space-y-8 p-4 md:p-6 lg:p-8">
      {/* الإحصائيات */}
      <section aria-label="إحصائيات المنصة" className="">
        <Card>
          <CardHeader>
            <CardTitle className=" items-center p- flex gap-2">
              <p>{"إجمالي المستخدمين"}</p>
              <Badge variant={"outline"} className="text-3xl p-4">
                {totalUsers}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {users.map((user) => {
              return <CardAnalytics key={user.title} item={user} />;
            })}
          </CardContent>
        </Card>
      </section>

      {/* أحدث المستخدمين */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">أحدث المستخدمين</h2>

            <p className="text-sm text-muted-foreground">آخر الحسابات التي انضمت إلى المنصة.</p>
          </div>

          <a href="/admin/users" className="shrink-0 text-sm font-medium text-primary hover:underline">
            عرض الكل
          </a>
        </div>

        <Card>
          <CardContent className="p-0">
            {recentUsers.length === 0 ? (
              <p className="p-6 text-center text-sm text-muted-foreground">لا يوجد مستخدمون حتى الآن.</p>
            ) : (
              <div className="divide-y">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 space-y-1">
                      <p className="truncate font-medium">{user.name}</p>

                      <p dir="ltr" className="truncate text-right text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role === "admin" ? "مسؤول" : "مستخدم"}
                      </Badge>

                      <span className="text-xs text-muted-foreground">{dateFormatter.format(user.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* أحدث الروابط */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">أحدث الروابط</h2>

            <p className="text-sm text-muted-foreground">آخر الروابط التي حفظها المستخدمون.</p>
          </div>

          <a href="/admin/links" className="shrink-0 text-sm font-medium text-primary hover:underline">
            عرض الكل
          </a>
        </div>

        <Card>
          <CardContent className="p-0">
            {recentLinks.length === 0 ? (
              <p className="p-6 text-center text-sm text-muted-foreground">لا توجد روابط حتى الآن.</p>
            ) : (
              <div className="divide-y">
                {recentLinks.map((link) => (
                  <div key={link.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 space-y-1">
                      <p className="truncate font-medium">{link.title || link.url}</p>

                      <p dir="ltr" className="truncate text-right text-sm text-muted-foreground">
                        {link.url}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        بواسطة: {link.user.name} ({link.user.email})
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <span className="text-xs text-muted-foreground">{dateFormatter.format(link.createdAt)}</span>

                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`فتح الرابط ${link.title || link.url}`}
                        className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <IconExternalLink className="size-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
interface PropsCardAnalytics {
  className?: string;
  item: {
    title: string;
    url?: string;
    icon: Icon;
    value?: number;
    description?: string;
  };
}

export function CardAnalytics({
  item,
  children,
  className,
  ...props
}: PropsCardAnalytics & ComponentPropsWithoutRef<typeof Card>) {
  return (
    <Card className={cn("via-card to-card gap-y-1", className)} key={item.title}>
      <CardHeader className="  ">
        {item.value !== undefined && <CardTitle className=" text-2xl">{numberFormatter.format(item.value)}</CardTitle>}
        <CardDescription className="text-sm">{item.title}</CardDescription>
        {/* <CardDescription className="text-sm font-medium "></CardDescription> */}

        <CardAction className="flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
          <item.icon className="size-5 " />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-1">
        {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
      </CardContent>
    </Card>
  );
}
