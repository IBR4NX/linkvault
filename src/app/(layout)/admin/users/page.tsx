"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, Users, ChevronLeft, ChevronRight } from "lucide-react";

import { authClient } from "@/lib/auth/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 10;

type UserRecord = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string | null;
  banned?: boolean | null;
  createdAt: string | Date;
};

type UsersResult = {
  users: UserRecord[];
  total: number;
  limit?: number;
  offset?: number;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<"name" | "email">("name");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await authClient.admin.listUsers({
        query: {
          limit: PAGE_SIZE,
          offset: page * PAGE_SIZE,
          sortBy: "createdAt",
          sortDirection: "desc",
          ...(search.trim()
            ? {
                searchValue: search.trim(),
                searchField,
                searchOperator: "contains" as const,
              }
            : {}),
        },
      });

      if (result.error) {
        throw new Error(result.error.message || "تعذر تحميل المستخدمين");
      }

      const data = result.data as UsersResult | null;

      setUsers(data?.users ?? []);
      setTotal(data?.total ?? 0);
    } catch (err) {
      setUsers([]);
      setTotal(0);
      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء تحميل المستخدمين",
      );
    } finally {
      setLoading(false);
    }
  }, [page, search, searchField]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadUsers();
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [loadUsers]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  function formatDate(value: string | Date) {
    return new Intl.DateTimeFormat("ar", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(value));
  }

  function getInitials(name: string) {
    return name.trim().slice(0, 2) || "؟";
  }

  return (
    <main className="space-y-6 p-4 md:p-6" dir="rtl">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            إدارة المستخدمين
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            عرض حسابات المستخدمين والبحث عنها.
          </p>
        </div>

        <Badge variant="secondary" className="w-fit gap-2 px-3 py-1.5">
          <Users className="size-4" />
          {total} مستخدم
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">جميع المستخدمين</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              setPage(0);
              void loadUsers();
            }}
          >
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(0);
                }}
                placeholder={
                  searchField === "name"
                    ? "ابحث باسم المستخدم..."
                    : "ابحث بالبريد الإلكتروني..."
                }
                className="pr-9"
                aria-label="البحث عن المستخدمين"
              />
            </div>

            <select
              value={searchField}
              onChange={(event) => {
                setSearchField(event.target.value as "name" | "email");
                setPage(0);
              }}
              aria-label="حقل البحث"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="name">الاسم</option>
              <option value="email">البريد الإلكتروني</option>
            </select>

            <Button type="submit" variant="secondary">
              بحث
            </Button>
          </form>

          {error && (
            <div
              role="alert"
              className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
            >
              <p>{error}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => void loadUsers()}
              >
                إعادة المحاولة
              </Button>
            </div>
          )}

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">المستخدم</TableHead>
                  <TableHead className="text-right">الصلاحية</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">تاريخ التسجيل</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      {Array.from({ length: 4 }).map((__, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className="h-8 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-muted-foreground"
                    >
                      تعذر عرض البيانات.
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-32 text-center text-muted-foreground"
                    >
                      لا يوجد مستخدمون مطابقون للبحث.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex min-w-52 items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={user.image ?? undefined}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0 space-y-1">
                            <p className="truncate font-medium">
                              {user.name}
                            </p>
                            <p
                              dir="ltr"
                              className="truncate text-right text-xs text-muted-foreground"
                            >
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            user.role === "admin" ? "default" : "secondary"
                          }
                        >
                          {user.role === "admin" ? "مدير" : "مستخدم"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={user.banned ? "destructive" : "outline"}
                        >
                          {user.banned ? "محظور" : "نشط"}
                        </Badge>
                      </TableCell>

                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {total === 0
                ? "لا توجد نتائج"
                : `عرض ${page * PAGE_SIZE + 1} إلى ${Math.min(
                    (page + 1) * PAGE_SIZE,
                    total,
                  )} من ${total}`}
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={loading || page === 0}
                onClick={() => setPage((current) => current - 1)}
              >
                <ChevronRight className="ml-1 size-4" />
                السابق
              </Button>

              <span className="min-w-20 text-center text-sm">
                صفحة {totalPages === 0 ? 0 : page + 1} من {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={loading || page + 1 >= totalPages}
                onClick={() => setPage((current) => current + 1)}
              >
                التالي
                <ChevronLeft className="mr-1 size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

