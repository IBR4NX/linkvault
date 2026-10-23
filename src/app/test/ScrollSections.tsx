"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
gsap.registerPlugin(Observer);
const sections = [
  { title: "Discover", color: "bg-blue-950" },
  { title: "Explore", color: "bg-emerald-950" },
  { title: "Create", color: "bg-orange-950" },
];
export default function ScrollSections() {
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".page-section");

      let currentIndex = 0;
      let animating = false;

      gsap.set(elements, {
        autoAlpha: 0,
        yPercent: 100,
        zIndex: 0,
      });

      gsap.set(elements[0], {
        autoAlpha: 1,
        yPercent: 0,
        zIndex: 1,
      });

      function gotoSection(index: number, direction: number) {
        if (animating || index === currentIndex) return;

        index = gsap.utils.wrap(0, elements.length, index);

        const current = elements[currentIndex];
        const next = elements[index];

        animating = true;

        gsap.set(next, {
          autoAlpha: 1,
          yPercent: direction * 100,
          zIndex: 2,
        });

        gsap
          .timeline({
            defaults: {
              duration: 0.8,
              ease: "power2.inOut",
            },
            onComplete: () => {
              gsap.set(current, {
                autoAlpha: 0,
                yPercent: -direction * 100,
                zIndex: 0,
              });

              animating = false;
            },
          })
          .to(current, {
            yPercent: -direction * 100,
          })
          .to(
            next,
            {
              yPercent: 0,
            },
            "<",
          );

        currentIndex = index;
      }

      const observer = Observer.create({
        target: container,
        type: "wheel,touch",
        wheelSpeed: -1,
        tolerance: 15,
        preventDefault: true,
        onUp: () => gotoSection(currentIndex + 1, 1),
        onDown: () => gotoSection(currentIndex - 1, -1),
      });

      return () => observer.kill();
    }, container);

    return () => ctx.revert();
  }, []);
  return (
    <main>
      {sections.map((section, index) => (
        <section
          key={section.title}
          className={`page-section absolute inset-0 flex items-center justify-center ${section.color}`}
        >
          {String(index + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
          <h1 className="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">{section.title}</h1>
          <p className="mt-6 text-sm text-white/60">Scroll to continue</p>
        </section>
      ))}
    </main>
  );
}
