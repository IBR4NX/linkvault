import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/auth-session";
import { LandingPage } from "@/app/landing-page";

export const dynamic = "force-dynamic";

export default async function Home() {
  if (await getCurrentSession()) redirect("/dashboard");
  return <LandingPage />;
}
