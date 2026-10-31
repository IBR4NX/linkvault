import { convertUser } from "@/services/convertData";
import { getCurrentSession } from "@/lib/auth/auth-session";
import UserActives from "./userActives";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getCurrentSession();

  const user = convertUser(session?.user);
  if (!("displayFields" in user)) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <p className="text-muted-foreground">No user data found.</p>
      </div>
    );
  }


  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <UserActives groups={user} url="/user" />
    </div>
  );
}
