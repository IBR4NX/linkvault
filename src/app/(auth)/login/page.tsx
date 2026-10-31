import { redirect } from "next/navigation";
import { AuthForm } from "@/app/(auth)/auth-form";
import { getCurrentSession } from "@/lib/auth/auth-session";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await getCurrentSession()) redirect("/dashboard");
  return <AuthForm mode="signin" />;
}
