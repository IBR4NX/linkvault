"use client"
import MainLink from "@/components/shared/mainLink";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className=" min-h-svh w-full items-center justify-center  md:p-10">
        <div className="fixed top-0 backdrop-blur-[6px] flex justify- items-center p-2  left-0 right-0 z-50">
          <Button
            onClick={() => window.history.back()}
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-transparent"
          >
            <ArrowRight className=" size-6" />
          </Button>
          <MainLink href="/" className="text-lg font-semibold tracking-tight">
            {SITE_NAME}
          </MainLink>
        </div>

        <div className="w-full m-auto mt-20 max-w-sm">{children}</div>
      </div>
    </>
  );
}
