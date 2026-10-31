// src/app/(dashboard)/users/[id]/page.tsx
import AppBreadcrumb from "@/components/layout/AppBreadcrumb";

export default async function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = { id, name: "أحمد محمد" };

  return (
    <div>
      {/* النتيجة: الرئيسية / المستخدمين / أحمد محمد */}
      <AppBreadcrumb customLabels={{ [id]: user.name }} />

      {/* باقي محتوى الصفحة */}
    </div>
  );
}
