import { IconUsers, IconLink, IconUserPlus, IconUserOff, IconClock, IconExternalLink, Icon } from "@tabler/icons-react";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { ComponentPropsWithoutRef } from "react";

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

  const [totalUsers, newUsers, bannedUsers, recentUsers, totalGoogle, totalCredential, todayAccounts, recentLinks] =
    await Promise.all([
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

      prisma.account.count({ where: { providerId: "google" } }),
      prisma.account.count({ where: { providerId: "credential" } }),
      prisma.session.count({
        where: {
          createdAt: {
            gte: startOfToday,
          },
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

  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: totalUsers,
      description: "جميع الحسابات المسجلة",
      icon: IconUsers,
    },

    {
      title: "مستخدمون جدد",
      value: newUsers,
      description: "خلال آخر 7 أيام",
      icon: IconUserPlus,
    },

    {
      title: "المستخدمون المحظورون",
      value: bannedUsers,
      description: "الحسابات المحظورة حاليًا",
      icon: IconUserOff,
    },
  ];

  return (
    <main dir="rtl" className="space-y-8 p-4 md:p-6 lg:p-8">
      {/* الإحصائيات */}
      <section aria-label="إحصائيات المنصة" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          return <CardAnalytics key={stat.title} item={stat} />;
        })}
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
    <Card className="via-card to-card space-y-0" key={item.title}>
      <CardHeader className="  ">
        <CardTitle>{item.title}</CardTitle>
        {/* <CardDescription className="text-sm font-medium text-muted-foreground"></CardDescription> */}

        <CardAction className="flex size-10 items-center justify-center rounded-lg bg-foreground text-background">
          <item.icon className="size-5 " />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-1">
        {item.value !== undefined && <CardTitle>{numberFormatter.format(item.value)}</CardTitle>}
        {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
      </CardContent>
    </Card>
  );
}
