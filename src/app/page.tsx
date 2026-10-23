import Link from "next/link";
import { ArrowLeft, MapPin, TrendingUp, Building2, Store, Layers, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

const cities = [
  { name: "صنعاء", type: "العاصمة الإدارية" },
  { name: "تعز", type: "المركز التجاري" },
  { name: "عدن", type: "العاصمة الاقتصادية" },
];

export default function IntroPage() {
  redirect("https://prices.ibovs.com");
  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen w-full flex-col bg-zinc-950 text-zinc-50 selection:bg-amber-500/30 selection:text-amber-200"
    >
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black" />
      <div className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-6 backdrop-blur-md lg:px-12">
        <Link href="https://prices.ibovs.com" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <span className="grid size-9 place-items-center rounded-lg border border-zinc-700 bg-zinc-900 font-bold text-amber-400">
            م
          </span>
          <span className="text-sm font-bold tracking-tight text-zinc-100">أسعار اليمن</span>
        </Link>

        <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400">
          <MapPin className="size-3.5 text-amber-400" />
          <span>الجمهورية اليمنية</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-6 py-16 lg:px-12 lg:py-24">
        <div className="w-full max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium text-amber-300">
            <TrendingUp className="size-4 text-amber-400" />
            <span>المؤشر المرجعي الموثوق لأسعار السلع في الأسواق اليمنية</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-6xl lg:text-7xl">
              بيانات السوق بدقة،{" "}
              <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                قبل أن تتخذ قرارك.
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              منصة تحليلية تتابع أسعار السلع الأساسية والاستهلاكية في مختلف المدن اليمنية لحظة بلحظة، لتوفير رؤية واضحة
              ومقارנות دقيقة تساعدك على إدارة ميزانيتك بذكاء.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              size="lg"
              render={
                <a href="https://prices.ibovs.com" className="flex items-center gap-2">
                  استكشف الأسعار
                  <ArrowLeft className="size-4" />
                </a>
              }
            />

            <div className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-400">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>تحديثات مستمرة لأسواق المحافظات</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex h-16 w-full items-center justify-between border-t border-zinc-800/80 bg-zinc-950 px-6 text-xs text-zinc-500 lg:px-12">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-amber-400" />
          <span>جميع البيانات مستمدة من أسواق التجزئة والجملة المحلية.</span>
        </div>
        <span>أسعار اليمن &copy; {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
