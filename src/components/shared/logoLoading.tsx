import * as React from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";
interface Props {
  className?: string;
  size?: number;
  spinner?: boolean;
  logo?: boolean;
  full?: boolean;
}

export default function LogoLoading({
  className = "",
  full = false,
  spinner = false,
  logo = true,
  size = 128,
  ...props
}: React.ComponentProps<"div"> & Props) {
  if (!spinner && !logo) return;
  return (
    <div className={full ? "flex relative justify-center items-center h-screen" : ""}>
      <div
        className={cn(
          "relative flex overflow-hidden rounded-full  animate-[loading_3s_ease-in-out_infinite] ",
          className,
        )}
        style={{ width: `${size}px`, height: `${size}px` }}
        {...props}
      >
        {logo && (
          <Image
            src="/favicons/favicon.svg"
            alt="logo"
            width={size}
            height={size}
            className=" w-3/4 h-3/4 rounded-full  m-auto mb-1 animate-bounce"
          />
        )}
        {spinner && <Spinner className="top-0 absolute stroke-ibovs-y" size={size} strokeWidth={3} />}
      </div>
    </div>
  );
}

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  size?: number | string;
  radius?: number;
  strokeWidth?: number;
  strokeColor?: string;
  dashArrayStart?: number;
  dashArrayEnd?: number;
  spinDuration?: string;
  dashDuration?: string;
  className?: string;
}

export function Spinner({
  width = 50,
  height = 50,
  size = 60,
  radius = 90,
  strokeWidth = 5,
  strokeColor = "orange",
  dashArrayStart = 50,
  dashArrayEnd = 565,
  spinDuration = "1s",
  dashDuration = "3s",
  className = "",
  ...props
}: SpinnerProps) {
  const center = Number(radius) + Number(strokeWidth); // مركز الدائرة
  //  console.log(className,strokeColor,spinDuration, dashDuration)
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${center * 2} ${center * 2}`}
      className={cn("spinCircle stroke-amber-400 ", className)}
      {...props}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        // stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dashArrayStart} ${dashArrayEnd}`}
        strokeDashoffset={0}
      />
    </svg>
  );
}
