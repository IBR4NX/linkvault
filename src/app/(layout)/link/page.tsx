import { redirect } from "next/navigation";
import { LinkManager } from "@/app/(layout)/link/link-manager";
import { getCurrentSession } from "@/lib/auth/auth-session";

export const dynamic = "force-dynamic";

export default async function LinkPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  console.log("LinkPage",session)
  return <LinkManager userName={session.user.name} />;
}
