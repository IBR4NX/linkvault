import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth/auth-session";
import { extractLinkTitle, linkInputSchema, normalizeUrl } from "@/lib/link-validation";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const parsed = linkInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid link" }, { status: 400 });
  }

  try {
    const normalizedUrl = normalizeUrl(parsed.data.url);
    const result = await prisma.link.updateMany({
      where: { id, userId: session.user.id },
      data: { url: normalizedUrl, title: parsed.data.title || extractLinkTitle(normalizedUrl) },
    });
    if (result.count === 0) return NextResponse.json({ error: "Link not found" }, { status: 404 });
    return NextResponse.json(await prisma.link.findFirst({ where: { id, userId: session.user.id } }));
  } catch {
    return NextResponse.json({ error: "Could not update the link." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  try {
    const result = await prisma.link.deleteMany({ where: { id, userId: session.user.id } });
    if (result.count === 0) return NextResponse.json({ error: "Link not found" }, { status: 404 });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Could not delete the link." }, { status: 500 });
  }
}
