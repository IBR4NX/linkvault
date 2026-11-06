"use client";
import CardInfo, { CardInfoProps } from "@/services/cardInfo";
import { authClient } from "@/lib/auth/auth-client";
import { useState } from "react";
import { DialogForm } from "@/services/DialogForm";
import { Button } from "@/components/ui/button";

export default function UserActives({ groups }: CardInfoProps) {
  const [open, setOpen] = useState(false);
const [loading, setLoading] = useState(false);
  function Submit(form: Record<string, string>) {
    setLoading(true);
    authClient.updateUser(form).then(()=>{

        setLoading(false);
        setOpen(false);
    }
    )

  }

  return (
    <>
      <CardInfo groups={groups} url="/user">
        <Button className="" variant="outline" onClick={() => setOpen(!open)}>
         تعديل البيانات
        </Button>
      </CardInfo>
      <DialogForm
        Submit={Submit}
        fields={groups.editableFields}
        open={open}
        loading={loading}
        setOpen={setOpen}
        onOpenChange={function (open: boolean): void {}}
      />
    </>
  );
}
