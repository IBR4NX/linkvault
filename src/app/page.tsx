import Link from "next/link";
import { ArrowLeft, MapPin, TrendingUp, Building2, Store, Layers, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { SITE_NAME } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";


export default function IntroPage() {
  // redirect("/test");
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <Skeleton className="w-16 h-16 border-t-4 border-b-4 border-muted-400 bg-transparent rounded-full animate-spin"/>
        {/* <p className="mt-4 text-lg text-primary">...</p> */}
        {/* <Skeleton className="w-32 h-4 mt-4" /> */}
      </div>
    </main>
  );
}
