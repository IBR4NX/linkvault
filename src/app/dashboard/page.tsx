import { redirect } from "next/navigation";
import { LinkManager } from "@/app/link-manager";
import { getCurrentSession } from "@/lib/auth/auth-session";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  console.log(session)
  return <LinkManager userName={session.user.name} />;
}
