"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer, ScrollTrigger);

type ScrollSceneProps = {
  children: React.ReactNode;
  className?: string;
  pinDistance?: number;
};

type ScrollContentProps = {
  title: string;
  description: string;
  className?: string;
};

export function Scroll({ children, className = "", pinDistance = 2000 }: ScrollSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const contents = gsap.utils.toArray<HTMLElement>(".scroll-content", sceneRef.current);

      // إظهار المحتوى الأول وإخفاء بقية المحتويات.
      gsap.set(contents, {
        autoAlpha: 0,
        y: 100,
        scale: 0.8,
      });

      gsap.set(contents[0], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: `+=${(contents.length + 1) * 500}`,
          pin: true,
          scrub: true,
          pinSpacing: true,

          snap: {
            snapTo: 1 / (contents.length - 1),
            duration: 0.1,
            delay: 0.1,
            inertia: false,
            directional: true,
          },
        },
      });
      console.log(1 / (contents.length - 1));
      contents.forEach((content, index) => {
        if (index === 0) return;

        const previous = contents[index - 1];

        timeline
          .to(previous, {
            autoAlpha: 0,
            y: -200,
            scale: 0.8,
          })
          .fromTo(content, { autoAlpha: 0, y: 200, scale: 0.8 }, { autoAlpha: 1, y: 0, scale: 1 }, "<");
      });
    },
    { scope: sceneRef },
  );

  return (
    <div ref={sceneRef} className={`relative min-h-screen overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function ScrollScene({ children, className = "" }: ScrollSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const contents = gsap.utils.toArray<HTMLElement>(".scroll-content", sceneRef.current);
      if (contents.length <= 1) return;

      let currentIndex = 0;
      let isAnimating = false;

      // 1. تهيئة العناصر: إظهار الأول وإخفاء البقية
      gsap.set(contents, { autoAlpha: 0, y: 150, scale: 0.8 });
      gsap.set(contents[0], { autoAlpha: 1, y: 0, scale: 1 });

      // 2. دالة الانتقال الفوري بين الأقسام
      const goToSection = (index: number, direction: number) => {
        if (index < 0 || index >= contents.length || isAnimating) return;
        isAnimating = true;

        const current = contents[currentIndex];
        const next = contents[index];

        const tl = gsap.timeline({
          defaults: { duration: 0.4, ease: "power2.out" }, // سرعة القفزة (0.4 ثانية ممتازة وسريعة)
          onComplete: () => {
            currentIndex = index;
            // تهدئة بسيطة لمنع القفز العشوائي إذا مرر المستخدم عجلة الماوس بقوة مفرطة
            setTimeout(() => {
              isAnimating = false;
            }, 200);
          },
        });

        // إخفاء القسم الحالي
        tl.to(current, {
          autoAlpha: 0,
          y: direction > 0 ? -150 : 150,
          scale: 0.8,
        })
          // إظهار القسم الجديد في نفس اللحظة
          .fromTo(
            next,
            { autoAlpha: 0, y: direction > 0 ? 150 : -150, scale: 0.8 },
            { autoAlpha: 1, y: 0, scale: 1 },
            "<",
          );
      };

      // 3. تثبيت العنصر في الشاشة
      const st = ScrollTrigger.create({
        trigger: sceneRef.current,
        start: "top top",
        end: "+=100%", // مسافة التثبيت
        pin: true,
        scrub: true,
      });

      // 4. مراقب اللمس والماوس للاستجابة الفورية من أول مليمتر
      ScrollTrigger.observe({
        target: sceneRef.current,

        type: "wheel,touch,pointer",
        tolerance: 10, // يستجيب لأقل حركة (10 بكسل فقط)
        onUp: (self) => {
          if (!st.isActive) return;

          // إذا لم نصل لآخر قسم، امنع سكرول الصفحة العادي وانتقل للقسم التالي فوراً
          if (currentIndex < contents.length - 1) {
            self.event.preventDefault();
            if (!isAnimating) {
              goToSection(currentIndex + 1, 1);
            }
          }
          // أما إذا كنا في آخر قسم، سيسمح للصفحة بالنزول بشكل طبيعي لباقي الموقع!
        },
        onDown: (self) => {
          if (!st.isActive) return;

          // إذا لم نكن في أول قسم، امنع سكرول الصفحة العادي وارجع للقسم السابق فوراً
          if (currentIndex > 0) {
            self.event.preventDefault();
            if (!isAnimating) {
              goToSection(currentIndex - 1, -1);
            }
          }
          // أما إذا كنا في أول قسم، سيسمح للصفحة بالصعود لأعلى الموقع بشكل طبيعي!
        },
      });
    },
    { scope: sceneRef },
  );

  return (
    <div ref={sceneRef} className={`relative min-h-screen overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function ScrollContent({ title, description, className = "" }: ScrollContentProps) {
  return (
    <div
      className={`scroll-content absolute inset-0 flex flex-col items-center justify-center text-center ${className}`}
    >
      <h2 className="mb-4 text-3xl font-bold md:text-7xl">{title}</h2>

      <p className="mx-auto max-w-2xl p-4 text-gray-400">{description}</p>
    </div>
  );
}
