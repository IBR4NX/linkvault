"use client";

import Link from "next/link";
import React from "react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Result } from "pg";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
    router.push("/dashboard");
    router.refresh();
  }
  async function withGoogle(event: React.MouseEvent) {
    event.button = 5;
    console.log("j")
    const result = isSignup
      ? await authClient.signUp
      : await authClient.signIn.social({provider:"google"});  
      console.log(result)
    };
  return (
    <main className="auth-shell">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="w-fit -ml-3">
              <ArrowLeft className="h-4 w-4" /> Back home
            </Button>
          </Link>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-2xl">{isSignup ? "Make the web yours." : "Welcome back."}</CardTitle>
            <CardDescription className="mt-2">
              {isSignup
                ? "Create a private place for the links you want to keep."
                : "Sign in to open your private link collection."}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Alex Morgan"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                minLength={8}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait…" : isSignup ? "Create my vault" : "Sign in"}
            </Button>
          </form>
          <div className="my-6 flex items-center gap-3">
            <Separator />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator />
          </div>
          <Button onClick={withGoogle} className={'w-full'}>
            {loading ? "Please wait…" : isSignup ? "sign up with google" : "Sign in with google"}
          </Button>
        </CardContent>
        <CardFooter   >
          <p className="text-center w-full text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "New to LinkVault?"}{" "}
            <Link className="font-medium text-primary hover:underline" href={isSignup ? "/login" : "/register"}>
              {isSignup ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
