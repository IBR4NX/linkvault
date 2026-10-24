import Link from "next/link";
import { ArrowLeft, MapPin, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";

const cities = ["صنعاء", "تعز", "عدن"];

export default function IntroPage() {
  return (
    <main
      dir="rtl"
      className="relative isolate flex min-h-screen w-full flex-col overflow-x-hidden bg-[#17251f] text-white selection:bg-amber-200 selection:text-[#17251f]"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_75%_40%,#a17b4d_0%,#5a5940_35%,#263a30_75%)]"
      />

      {/* Background texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.08] bg-[radial-gradient(#fff_0.7px,transparent_0.7px)] [background-size:7px_7px]"
      />

      {/* Header */}
      <header className="relative z-20 flex shrink-0 items-center justify-between px-5 py-4 sm:px-10 sm:py-6 lg:px-16">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="أسعار اليمن - الرئيسية"
        >
          <span className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/10 text-xl font-black text-amber-200 backdrop-blur-md">
            م
          </span>

          <span className="text-base font-bold tracking-tight sm:text-lg">أسعار اليمن</span>
        </Link>

        <div className="hidden items-center gap-2 text-sm text-white/65 sm:flex">
          <MapPin className="size-4 text-amber-200" />
          <span>اليمن</span>
        </div>
      </header>

      {/* Main content */}
      <section className="relative z-10 flex flex-1 items-center px-5 py-12 sm:px-10 lg:px-16">
        <div className="w-full max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-black/15 px-3 py-2 text-xs text-amber-100 backdrop-blur-sm sm:text-sm">
            <TrendingUp className="size-4 text-amber-200" />
            <span>مرجعك لمعرفة أسعار السوق اليمني</span>
          </div>

          <h1 className="max-w-3xl text-[clamp(2.4rem,7vw,5.5rem)] leading-[1.35] font-black tracking-tight">
            اعرف السوق.
            <br />
            <span className="text-amber-200">قبل أن تشتري.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-8 text-white/75 sm:mt-6 sm:text-base sm:leading-9 lg:text-lg">
            أسعار السلع في اليمن، من صنعاء إلى تعز وعدن. اكتشف الأسعار، وقارن بينها، وتابع تغيّرها لتكون قراراتك مبنية
            على المعرفة.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            <Button
              size="lg"
              className="h-12 rounded-xl bg-amber-200 px-5 font-bold text-[#17251f] hover:bg-amber-100 transition-colors"
              render={
                <Link href="/prices" className="flex items-center gap-2">
                  استكشف الأسعار
                  <ArrowLeft className="size-4" />
                </Link>
              }
            />

            <div className="flex items-center gap-2 px-2 text-xs text-white/65 sm:text-sm">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>الأسعار حسب المدينة</span>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2 sm:mt-9">
            {cities.map((city) => (
              <span
                key={city}
                className="rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2 text-xs text-white/80 backdrop-blur-sm sm:text-sm"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Market illustration */}
      <div aria-hidden="true" className="pointer-events-none relative w-full h-48 sm:h-64 overflow-hidden mt-auto">
        {/* Mountains */}
        <div className="absolute inset-x-[-10%] bottom-[25%] h-[75%] bg-[#c3a477]/25 [clip-path:polygon(0_100%,0_60%,12%_25%,23%_60%,37%_8%,52%_64%,67%_20%,82%_62%,94%_28%,100%_55%,100%_100%)]" />

        <div className="absolute inset-x-[-10%] bottom-[18%] h-[60%] bg-[#9b825b]/40 [clip-path:polygon(0_100%,0_55%,18%_20%,33%_65%,49%_10%,65%_58%,80%_24%,100%_60%,100%_100%)]" />

        {/* Yemeni-style buildings */}
        <div className="absolute inset-x-0 bottom-[22%] flex items-end justify-center gap-1.5 opacity-70 sm:gap-3">
          {["h-20", "h-28", "h-24", "h-36", "h-28", "h-40", "h-24", "h-32", "h-20"].map((height, index) => (
            <div
              key={index}
              className={`relative w-[9vw] max-w-24 min-w-8 ${height} border border-[#e1c49a]/35 bg-[#8c6b49]/80 sm:w-20`}
            >
              <div className="absolute inset-x-1 top-2 grid grid-cols-2 gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="h-3 border border-[#e8c99b]/20 bg-[#352f26]/80 sm:h-4" />
                ))}
              </div>

              <div className="absolute inset-x-0 top-0 h-1 bg-[#e0bd8b]/60" />
            </div>
          ))}
        </div>

        {/* Market awnings */}
        <div className="absolute inset-x-0 bottom-[7%] flex items-end justify-center gap-2 px-3 sm:gap-5">
          {[
            {
              roof: "bg-[repeating-linear-gradient(90deg,#a84f35_0_18px,#e9c58d_18px_36px)]",
              width: "w-[29%] sm:w-48",
            },
            {
              roof: "bg-[repeating-linear-gradient(90deg,#d8ad68_0_18px,#f0dfba_18px_36px)]",
              width: "w-[32%] sm:w-56",
            },
            {
              roof: "bg-[repeating-linear-gradient(90deg,#496c50_0_18px,#d9c39b_18px_36px)]",
              width: "w-[29%] sm:w-48",
            },
          ].map((stall, index) => (
            <div
              key={index}
              className={`${stall.width} ${index === 1 ? "-translate-y-2" : ""} overflow-hidden shadow-2xl`}
            >
              <div className={`h-5 sm:h-8 ${stall.roof}`} />

              <div className="flex h-8 items-center justify-around bg-[#d7b98b] text-sm sm:h-12 sm:text-xl">
                {index === 0 && "🍅 🥔 🧅"}
                {index === 1 && "🌾 🫘 🌶️"}
                {index === 2 && "🍋 🥬 🍊"}
              </div>

              <div className="h-5 border-t-4 border-[#ad8255] bg-[#654832] sm:h-8" />
            </div>
          ))}
        </div>

        {/* Foreground */}
        <div className="absolute inset-x-0 bottom-0 h-[8%] bg-[#292a22]" />

        {/* Fade into content */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#263a30]/20" />
      </div>

      {/* Footer */}
      <footer className="relative z-20 flex shrink-0 items-center justify-between border-t border-white/10 bg-[#17251f]/30 px-5 py-3 text-[10px] text-white/50 backdrop-blur-sm sm:px-10 sm:py-4 sm:text-xs lg:px-16">
        <span>أسعار أوضح، وقرارات أفضل.</span>
        <span>السوق اليمني</span>
      </footer>
    </main>
  );
}
