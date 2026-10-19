"use client";
import React, { useState, memo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
// import ImageForm from "@/components/shared/form/image-form";
import { DialogForm } from "@/services/DialogForm";
// import { DialogPassword } from "@/components/shared/dialog";
import { GroupNames } from "./convertData";

export type CardInfoProps = {
  groups: GroupNames;
  url: string;
  dialogContent?: React.JSX.Element;
  Submit?: (form: Record<string, string>) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  children?: React.ReactNode;
};

const CardInfo = memo(function CardInfo({
  groups,
  url,
  dialogContent,
  Submit,
  open = false,
  setOpen,
  children,
}: CardInfoProps) {
  const [openPassword, setOpenPassword] = useState(false);
  if (!groups) return null;
  return (
    <>
      <Card className="rounded-2xl shadow-sm" dir="rtl">
        {groups.displayHeader && (
          <CardHeader className="flex flex-col items-center gap-4">
            {groups.displayHeader.map((i) => {
              if (i.key == "image")
                return (
                  // <ImageForm avatar={data.imgUrl}>
                  <Avatar key={i.key} className="size-32 w-h-8">
                    <AvatarImage loading="lazy" src={i.value as string} />
                    <AvatarFallback>{i.name}</AvatarFallback>
                  </Avatar>
                  // </ImageForm>
                );
              return i.key == "name" ? (
                <CardTitle key={i.key} className="text-xl">
                  {i.value as string}
                </CardTitle>
              ) : (
                <CardDescription key={i.key} className="">
                  {i.value as string}
                </CardDescription>
              );
            })}
            <div className="text-center"></div>
          </CardHeader>
        )}

        <Separator />
        <CardContent className="space-y-4 pt-6">
          {groups.displayFields.length > 0 &&
            groups.displayFields?.map((i) => (
              <Item key={i.key} className="flex justify-between">
                <ItemMedia>{i.name}</ItemMedia>
                <ItemContent>
                  <ItemTitle>{typeof i.value === "string" ? i.value : String(i.value)}</ItemTitle>
                </ItemContent>
              </Item>
            ))}
        </CardContent>
        <CardFooter>
          <div className=" flex gap-4 pt-2">
            {children}

            {Submit && setOpen && (
              <DialogForm
                Submit={Submit}
                fields={groups.editableFields}
                open={open}
                setOpen={setOpen}
                url={url}
                onOpenChange={function (open: boolean): void {
                  // throw new Error("Function not implemented.");
                }}
              />
            )}
            {/* <DialogPassword /> */}
          </div>
        </CardFooter>
      </Card>
    </>
  );
});
export default CardInfo;
