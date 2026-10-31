import { redirect } from "next/navigation";
import { LinkManager } from "@/app/(layout)/link/link-manager";
import { getCurrentSession } from "@/lib/auth/auth-session";
// import { createConverter } from "@/services/convertData";
import { pickFields,convertUser } from "@/services/convertData";
export const dynamic = "force-dynamic";

export default async function LinkPage() {
  const session = await getCurrentSession();
  // const testConvert = createConverter({
  //   groups: {
  //     data: ["name", "email"]
  //   },
  //   labels: {
  //     name: "الاسم",
  //     email: "البريد"
  //   }
  // });
  const result = pickFields({ title: "Example Title", url: "https://example.com", description: "Example Description" }, [ "url",{title:"العنوان",deiscription:"الوصف"}]);
  console.log("LinkPage pickFields result:", result);
   console.log("LinkPage user ", convertUser(session?.user));
  if (!session) redirect("/login");
  return <LinkManager userName={session.user.name} />;
}
