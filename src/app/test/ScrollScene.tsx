"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useGSAP } from "@gsap/react";
export default function ScrollScene() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          pin: true,
          end: "+=2500",
        },
      });
      gsap.defaults({
        duration: 0.5,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".intro",
            start: "top top",
            toggleActions: "play none none reverse",
            markers: true,
          },
        })
        .to(".title", {
          y: -100,
          scale: 0.8,
        })
        .fromTo(
          ".description",
          {
            autoAlpha: 0,
            scale: 0.5,
            y: 100,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
          },
          "<",
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".about",
            start: "top top+=0",
            markers: true,

            toggleActions: "none play none reverse",
          },
        })
        .to(".intro", { autoAlpha: 0, y: -150, scale: 0.5, delay: 0.3 })
        // .to(".description", { autoAlpha: 0, y: -100, scale: 0.5 }, "<")

        .fromTo(
          ".about",
          {
            autoAlpha: 0,
            y: 100,
            scale: 1.2,
          },
          {
            autoAlpha: 1,
            y: -100,
            scale: 1,
            delay: 0.2,
          },
          "<",
        );
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: sectionRef, revertOnUpdate: true },
  );

  return (
    <>
      <div>
        <section
          ref={sectionRef}
          className="relative flex flex-col min-h-screen items-center justify-center overflow-hidden bg-[#080b16] text-white"
        >
          <section className="intro absolute   flex-col inset-0 flex items-center justify-center  text-white">
            <div className="title text-center">
              <p className="mb-4 text-sm tracking-[0.4em] text-blue-300">Software Engineer</p>

              <h2 className="text-3xl font-bold md:text-7xl">Ibrahim Al-Mekhlafi</h2>
            </div>

            <p className="description  max-w-2xl p-4 text-center text-md text-gray-400 opa">
              Building software with purpose. I build modern web applications, desktop software, and organized systems
              with a focus on clean code, performance, and maintainability.
            </p>
          </section>
          <section className="about absolute  flex-col inset-0 flex items-center justify-center  text-white">
            <div className="about-title  pb-10 text-center">
              <p className="mb-4 text-sm tracking-[0.4em] text-blue-300">WHAT I DO</p>
              <h2 className=" text-3xl font-bold md:text-5xl">Turning Ideas Into Reality</h2>
            </div>
            <p className="about-description  max-w-2xl p-4 text-center text-md text-gray-400 opa">
              I'm a software developer who enjoys solving problems and building software that is simple, efficient, and
              easy to maintain. I focus on understanding the root cause of problems, writing clean code, and creating
              solutions that can grow and evolve over time.
            </p>
          </section>
        </section>
        import ScrollSection from "@/components/scroll-section";
        <ScrollSection className="bg-[#080b16] text-white">
          <div className="title absolute pb-10 text-center">
            <p className="mb-4 text-sm tracking-[0.4em] text-blue-300">Software Engineer</p>

            <h2 className="text-3xl font-bold md:text-7xl">Ibrahim Al-Mekhlafi</h2>
          </div>

          <p className="description absolute max-w-2xl p-4 text-center text-gray-400 opacity-0">
            Building software with purpose. I build modern web applications, desktop software, and organized systems
            with a focus on clean code, performance, and maintainability.
          </p>
        </ScrollSection>
      </div>
    </>
  );
}

type ScrollSectionProps = {
  children: React.ReactNode;
  className?: string;
  pin?: boolean;
  pinDistance?: number;
};

export function ScrollSection({ children, className = "", pin = true, pinDistance = 1500 }: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!pin) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${pinDistance}`,
        pin: true,
        pinSpacing: true,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative flex min-h-screen items-center justify-center overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}
