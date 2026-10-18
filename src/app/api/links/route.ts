import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/auth-session";
import { extractLinkTitle, linkInputSchema, normalizeUrl } from "@/lib/link-validation";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const links = await prisma.link.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(links);
  } catch {
    return NextResponse.json({ error: "Could not load links." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = linkInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid link" }, { status: 400 });
  }

  try {
    const normalizedUrl = normalizeUrl(parsed.data.url);
    const link = await prisma.link.create({
      data: {
        userId: session.user.id,
        url: normalizedUrl,
        title: parsed.data.title || extractLinkTitle(normalizedUrl),
      },
    });
    return NextResponse.json(link, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save the link." }, { status: 500 });
  }
}
