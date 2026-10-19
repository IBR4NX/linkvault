"use client";

import Link from "next/link";
import React from "react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSlideIn, motion } from "@/hooks/use-slide-in";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const router = useRouter();
  const isSignup = mode === "signup";
  async function submit(event: FormEvent<HTMLFormElement>) {
    console.log("LL");
    event.preventDefault();
    setLoading(true);
    setError("");
    const result = isSignup
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });

    setLoading(false);
    if (result.error) {
      setError(result.error.message || "Authentication failed.");
      return;
    }
    router.push("/account");
    router.refresh();
  }
  async function withGoogle(event: React.MouseEvent) {
    setLoadingGoogle(true);
    setError("");
    const result = await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    console.log(result);
    if (!result) {
      setError("Authentication failed.");
      return;
    }
    setLoadingGoogle(false);
  }
  const animation = useSlideIn({
    direction: "down",
    distance: 100,
    duration: 0.5,
  });
  return (
    <motion.div {...animation} className="flex flex-col items-center justify-center w-full h-full">
      <Card dir="rtl" className="w-full max-w-sm">
        <CardHeader className="space-y-  justify-center items-center">
          <div className="flex m-auto mb-6 h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <img src="/icons/icons8_privacy.ico" alt="Google Icon" width={20} height={20} />
          </div>
          <CardTitle className="text-3xl text-center">{isSignup ? "إنشاء حساب" : "تسجيل الدخول"}</CardTitle>
          <CardDescription className=" text-center">
            {isSignup ? " إنشاء حسابك الخاص للإستفادة من خدماتنا ." : " قم بتسجيل الدخول لكي تتمكن من إنجاز مهمتك."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="name">الاسم</Label>
                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="أدخل اسمك"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                required
                minLength={8}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="أدخل كلمة المرور"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? "" : isSignup ? "إنشاء حساب" : "تسجيل الدخول"}
            </Button>
          </form>
          <div className="flex items-center gap-3">
            <Separator   className="flex-1" />
            <span className="shrink-0 text-xs text-muted-foreground">أو</span>
            <Separator className="flex-1" />
          </div>

          <Button onClick={withGoogle} variant={"secondary"} disabled={loadingGoogle} className={"w-full"}>
            {loadingGoogle ? "Please wait…" : isSignup ? "إنشاء حساب مع Google" : "تسجيل الدخول مع Google"}
            <img src="/icons/icons8_google.ico" alt="Google Icon" width={20} height={20} />
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full text-sm text-muted-foreground">
            {isSignup ? "هل لديك حساب بالفعل؟" : "هل تملك حساباً بالفعل؟"}{" "}
            <Link className="font-medium text-primary hover:underline" href={isSignup ? "/login" : "/register"}>
              {isSignup ? "تسجيل الدخول" : "إنشاء حساب"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
