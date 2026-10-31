"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
gsap.registerPlugin(Observer,ScrollTrigger);
const sections = [
  { title: "Discover", color: "bg-blue-950" },
  { title: "Explore", color: "bg-emerald-950" },
  { title: "Create", color: "bg-orange-950" },
];
type ScrollSceneProps = {
  children?: React.ReactNode;
  className?: string;
  elementsClassName?: string;
};
export function ScrollSections({ children, className = "", elementsClassName = ".scroll-content" }: ScrollSceneProps) {
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(elementsClassName);

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
        tolerance: 100,
        preventDefault: true,
        onUp: () => gotoSection(currentIndex + 1, 1),
        onDown: () => gotoSection(currentIndex - 1, -1),
      });

      return () => observer.kill();
    }, container);

    return () => ctx.revert();
  }, []);
  return (
    <section ref={containerRef} className=" overflow-hidden h-svh">
      {children}
      {/* {sections.map((section, index) => (
        <section
          key={section.title}
          className={`pageSection absolute inset-0 flex flex-col items-center justify-center ${section.color}`}
        >
          {String(index + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
          <h1 className="text-6xl font-black tracking-tight sm:text-8xl md:text-9xl">{section.title}</h1>
        </section>
      ))} */}
    </section>
  );
}
type ScrollContentProps = {
  title: string;
  description: string;
  className?: string;
  id: string;
  to: string;
};

export function ScrollContent({id,to, title, description, className = "" }: ScrollContentProps) {
  return (
    <div id={id}
      className={`scroll-content absolute inset-0 flex flex-col items-center justify-center text-center ${className}`}
    >
      <h2 className="mb-4 text-3xl font-bold md:text-7xl">{title}</h2>

      <p className="mx-auto max-w-2xl p-4 text-gray-400">{description}</p>
      <Link href={`#${to}`} className="absolute animate-bounce bottom-20 text-primary/60">
        <p className="   animate-pulse text-sm">Scroll to continue</p>
      </Link>
    </div>
  );
}