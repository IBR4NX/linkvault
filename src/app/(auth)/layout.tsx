"use client";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className=" min-h-148 h-svh w-full   relative  items-center justify-center  md:p-10">
        <div
          dir="rtl"
          className="fixed top-0 backdrop-blur-[6px] flex justify- items-center p-2 gap-4 left-0 right-0 z-50"
        >
          <Button
            onClick={() => window.history.back()}
            type="button"
            variant="link"
            size="icon"
            className="text-muted-foreground hover:bg-transparent"
          >
            <ArrowRight className=" size-6" />
          </Button>
          <Link href="/" className="text-lg font-semibold tracking-tight">
            {SITE_NAME}
          </Link>
        </div>

        <div className=" m-auto h-fit absolute left-0 right-0  top-0 bottom-0   w-sm">{children}</div>
      </div>
    </>
  );
}
