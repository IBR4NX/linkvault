"use client";

import { useEffect, useRef } from "react";
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
          end: "+=1500",
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".title",
            start: "top 20%",
            toggleActions: "play none none reverse",
            markers: true,
          },
        })
        .to(".title", {
          y: -100,
          scale: 0.8,
          duration: 1,
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
            duration: 1,
          },
          "<",
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".description",
            start: "top 20%",
            toggleActions: "play none reverse none ",
            markers: true,
          },
        })
        .to(".title", { alpha: 0, y: -150, scale: 0.5, delay: 1 })
        .to(".description", { alpha: 0, y: -100, scale: 0.5 }, "<");
      // .to(".scene-card", {
      //   scale: 1,
      //   opacity: 1,
      //   y: 0,
      //   stagger: {
      //     each: 0.3,
      //     from: "center",
      //   },
      // });

      gsap.utils.toArray<HTMLElement>(".hh").forEach((el, index) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0.5, y: (index + 1) * 50, scale: 0.5 },
          {
            autoAlpha: 1,
            y: 1,
            scale: 1,
            duration: 2,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 50%",
              toggleActions: "restart none none reverse",
            },
          },
        );
      });
      // gsap.fromTo(
      //   "description",
      //   { autoAlpha: 0.5, y: 50, scale: 0.5 },
      //   {
      //     autoAlpha: 1,
      //     y: 1,
      //     scale: 1,
      //     duration: 2,
      //     ease: "power3.out",
      //     scrollTrigger: {
      //       trigger: sectionRef.current,
      //       start: "top 50%",
      //       toggleActions: "restart none none reverse",
      //     },
      //   },
      // );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: sectionRef, revertOnUpdate: true },
  );

  return (
    <>
      <div>
        <section
          ref={sectionRef}
          className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b16] text-white"
        >
          <div className="title absolute pb-10 text-center">
            <p className="mb-4 text-sm tracking-[0.4em] text-blue-300">Software Engineer</p>

            <h2 className="text-3xl font-bold md:text-7xl">Ibrahim Al-Mekhlafi</h2>
          </div>

          <p className="description absolute max-w-2xl p-4 text-center text-md text-gray-400 opa">
            Building software with purpose. I build modern web applications, desktop software, and organized systems
            with a focus on clean code, performance, and maintainability.
          </p>
        </section>
      </div>
    </>
  );
}
