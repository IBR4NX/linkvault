import { redirect } from "next/navigation";
import { LandingPage } from "@/app/landing-page";
import { getCurrentSession } from "@/lib/auth/auth-session";

export const dynamic = "force-dynamic";

export default async function Home() {
  if (await getCurrentSession()) redirect("/dashboard");
  return <LandingPage />;
}
