"use client";
import Link from "next/link";
import { ArrowRight, Check, ExternalLink, Sparkles } from "lucide-react";
import { ModeToggle } from "@/components/theme/themeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function LandingPage() {
  return (
    <main>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="rounded-lg bg-primary text-xs text-primary-foreground">LV</AvatarFallback>
          </Avatar>
          LinkVault
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" >
            <Link href="/login">Sign in</Link>
          </Button>
          <Button >
            <Link href="/register">Create account</Link>
          </Button>
        </div>
      </nav>
      <Separator />
      <section className="landing-grid mx-auto max-w-6xl px-6">
        <div>
          <Badge variant="secondary" className="mb-5 gap-1">
            <Sparkles className="h-3 w-3" /> A quieter way to save the web
          </Badge>
          <h1 className="max-w-2xl text-5xl font-bold tracking-tight md:text-7xl">
            Save what matters.<span className="block text-primary">Find it fast.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            LinkVault keeps your favorite corners of the internet organized, private, and ready whenever you are.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" >
              <Link href="/register">
                Start your vault <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" >
              <Link href="/login">I already have an account</Link>
            </Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4 text-emerald-600" /> Private by default
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4 text-emerald-600" /> No clutter
            </span>
          </div>
        </div>
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="border-b bg-muted/40">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Your collection</CardTitle>
              <Badge variant="outline">12 saved</Badge>
            </div>
          </CardHeader>
          <CardContent className="preview-grid p-4">
            <PreviewRow icon="A" title="Design inspiration" url="are.na/channel/design" color="bg-blue-600" />
            <PreviewRow icon="R" title="Read later" url="longreads.com/article/..." color="bg-orange-600" />
            <PreviewRow icon="G" title="Useful resources" url="github.com/awesome-list" color="bg-violet-600" />
            <Button variant="outline" className="mt-2 justify-start text-muted-foreground">
              <span className="text-primary">＋</span> Add a new link
            </Button>
          </CardContent>
        </Card>
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 border-t px-6 py-10 md:grid-cols-3">
        <Feature number="01" title="Capture instantly" text="Drop in a URL and let LinkVault do the organizing." />
        <Feature number="02" title="Keep it yours" text="Your links belong to you, separated from everyone else." />
        <Feature number="03" title="Return anytime" text="Open, copy, or revisit your collection in a click." />
      </section>
    </main>
  );
}
function PreviewRow({ icon, title, url, color }: { icon: string; title: string; url: string; color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <Avatar className={`h-9 w-9 rounded-md ${color}`}>
        <AvatarFallback className="rounded-md bg-transparent text-white">{icon}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{url}</p>
      </div>
      <ExternalLink className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
function Feature({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-primary">{number}</p>
      <h2 className="mt-2 font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
