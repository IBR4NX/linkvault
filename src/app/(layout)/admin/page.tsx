import { IconUsers, IconLink, IconUserPlus, IconUserOff, IconClock, IconExternalLink } from "@tabler/icons-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

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

  const [totalUsers, totalLinks, newUsers, todayLinks, bannedUsers, recentUsers, recentLinks] = await Promise.all([
    prisma.user.count(),

    prisma.link.count(),

    prisma.user.count({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    }),

    prisma.link.count({
      where: {
        createdAt: {
          gte: startOfToday,
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
        name: true,
        email: true,
        role: true,
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

  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: totalUsers,
      description: "جميع الحسابات المسجلة",
      icon: IconUsers,
    },
    {
      title: "إجمالي الروابط",
      value: totalLinks,
      description: "جميع الروابط المحفوظة",
      icon: IconLink,
    },
    {
      title: "مستخدمون جدد",
      value: newUsers,
      description: "خلال آخر 7 أيام",
      icon: IconUserPlus,
    },
    {
      title: "روابط اليوم",
      value: todayLinks,
      description: "الروابط المنشأة اليوم",
      icon: IconClock,
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
          const Icon = stat.icon;

          return (
            <Card className="bg-linear-to-br from-primary/5 via-card to-card" key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>

                <div className="rounded-lg bg-muted p-2">
                  <Icon className="size-5 text-muted-foreground" />
                </div>
              </CardHeader>

              <CardContent className="space-y-1">
                <p className="text-3xl font-bold tabular-nums">{numberFormatter.format(stat.value)}</p>

                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
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
