"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, ExternalLink, MoreHorizontal, Pencil, Trash2, X } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";
import { ThemeToggle } from "@/components/theme/themeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
type LinkItem = { id: string; url: string; title: string; createdAt: string };
export function LinkManager({ userName }: { userName: string }) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  useEffect(() => {
    let active = true;
    fetch("/api/links", { cache: "no-store" })
      .then(async (response) => {
        if (!active) return;
        if (response.ok) setLinks(await response.json());
        else setError("Could not load your links.");
        setLoading(false);
      })
      .catch(() => {
        if (active) {
          setError("Could not connect to your vault.");
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);
  function resetForm() {
    setUrl("");
    setTitle("");
    setEditingId(null);
  }
  function startEditing(link: LinkItem) {
    setEditingId(link.id);
    setUrl(link.url);
    setTitle(link.title);
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function saveLink(event: FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);
    const editing = Boolean(editingId);
    const response = await fetch(editing ? `/api/links/${editingId}` : "/api/links", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, title: title || undefined }),
    });
    const data = await response.json().catch(() => null);
    setSaving(false);
    if (!response.ok) {
      setError(data?.error || "Could not save this link.");
      return;
    }
    if (editing) setLinks((current) => current.map((link) => (link.id === editingId ? data : link)));
    else setLinks((current) => [data, ...current]);
    resetForm();
    setNotice(editing ? "Link updated." : "Link saved to your vault.");
  }
  async function removeLink(id: string) {
    setError("");
    const response = await fetch(`/api/links/${id}`, { method: "DELETE" });
    if (response.ok) {
      setLinks((current) => current.filter((link) => link.id !== id));
      setNotice("Link deleted.");
    } else setError("Could not delete that link.");
  }
  async function copyLink(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setNotice("URL copied to clipboard.");
    } catch {
      setError("Clipboard access is unavailable.");
    }
  }
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <TooltipProvider>
      <main className="dashboard-shell">
        <header className="flex items-center justify-between gap-4 py-4">


        </header>
        <Separator className="mb-8" />
        <section className="mb-8 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <Badge variant="secondary" className="mb-3">
              Your private vault
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Keep something worth returning to.</h1>
            <p className="mt-3 text-muted-foreground">
              Save a URL and we&apos;ll keep it ready for the next time you need it.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{editingId ? "Edit link" : "Add a link"}</CardTitle>
              <CardDescription>
                {editingId
                  ? "Update the details of this saved link."
                  : "The title is optional; we can infer one from the URL."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveLink} className="grid gap-3 sm:grid-cols-[1.4fr_1fr_auto]">
                <Input
                  required
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://example.com/article"
                  aria-label="URL"
                />
                <Input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Title (optional)"
                  aria-label="Title"
                />
                <div className="flex gap-2">
                  <Button disabled={saving}>{saving ? "Saving…" : editingId ? "Update" : "Save"}</Button>
                  {editingId && (
                    <Button type="button" variant="outline" size="icon" onClick={resetForm} aria-label="Cancel edit">
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {notice && (
                <Alert variant={"default"} className="mt-4">
                  <AlertDescription className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    {notice}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-primary">YOUR COLLECTION</p>
            <h2 className="mt-1 text-2xl font-semibold">
              {links.length} {links.length === 1 ? "link" : "links"}
            </h2>
          </div>
          <Badge variant="secondary">Private by default</Badge>
        </div>
        {loading ? (
          <div className="grid gap-3">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-24 w-full" />
            ))}
          </div>
        ) : links.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <ExternalLink className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle className="text-lg">Your vault is ready.</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                Add your first link above. Only you can see what you save.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {links.map((link) => (
              <Card key={link.id}>
                <CardContent className="link-card-grid p-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <Avatar className="h-10 w-10 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                        <ExternalLink className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h3 className="truncate font-medium">{link.title}</h3>
                      <a href={link.url} className="block truncate text-sm text-muted-foreground hover:text-primary">
                        {link.url}
                      </a>
                      <time className="text-xs text-muted-foreground">
                        {new Date(link.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </time>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <Action label="Copy URL" onClick={() => void copyLink(link.url)}>
                      <Copy />
                    </Action>
                    <Action label="Open in current tab" asLink href={link.url}>
                      <ExternalLink />
                    </Action>
                    <Action label="Open in new tab" asLink href={link.url} newTab>
                      <ExternalLink />
                    </Action>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon" aria-label="More actions">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        }
                      ></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => startEditing(link)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => void removeLink(link.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </TooltipProvider>
  );
}
function Action({
  label,
  onClick,
  children,
  asLink,
  href,
  newTab,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  asLink?: boolean;
  href?: string;
  newTab?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          asLink ? (
            <Button variant="ghost" size="icon">
              <a
                href={href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noopener noreferrer" : undefined}
                aria-label={label}
              >
                {children}
              </a>
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={onClick} aria-label={label}>
              {children}
            </Button>
          )
        }
      ></TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
