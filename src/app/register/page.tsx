import { redirect } from "next/navigation";
import { AuthForm } from "@/app/auth-form";
import { getCurrentSession } from "@/lib/auth/auth-session";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  if (await getCurrentSession()) redirect("/dashboard");
  return <AuthForm mode="signup" />;
}
