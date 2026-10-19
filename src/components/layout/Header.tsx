"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { ColorToggle, ModeToggle } from "@/components/theme/themeToggle";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import SideTrigger from "./toggles/side-trigger";
import  Link  from "next/link";
import { SITE_NAME } from "@/lib/constants";
export function Header({ children, className }: React.ComponentProps<"div">) {
  const [isTop, setIsTop] = React.useState(true);
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 500) {
      setHidden(true);
    } else if (hidden) {
      setHidden(false);
    }
    if (!isTop && current < 100) {
      setIsTop(true);
    } else if (isTop && current > 100) {
      setIsTop(false);
    }
  });

  return (
    <div className=" top-0 sticky w-full left-0 right-0 h-fit">
      <motion.header dir="rtl"
        className={cn(
          "bg-card fikxed w-full z-20 top-0 inset-x-0 flex shrink-0 items-center gap-2 border-b  p-2 px-4 transition-all duration-300",
          className,
          !isTop && "drop-shadow-md/25",
          "drop-shadow-foreground",
        )}
        onClick={() => setHidden(false)}
        animate={{
          y: hidden ? -50.7 : 0,
          //opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
        //{...props}
      >
        <SideTrigger />
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {SITE_NAME}
        </Link>
        {children}
        <div className="mr-auto flex gap-2 items-center ">
          <ColorToggle />
          <ModeToggle />
        </div>
        <motion.div
          id="scroll-indicator"
          style={{
            scaleX: scrollYProgress,
            bottom: -1,
            left: 0,
            right: 0,
            height: 1,
            originX: 0,
          }}
          className={cn(" absolute bg-primary z-10 ")}
          onClick={() => setHidden(false)}
        />
      </motion.header>
    </div>
  );
}
