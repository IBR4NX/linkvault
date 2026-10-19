"use client";
import { MonitorCog, Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

export function ThemeToggle() {
  const [loading, setLoading] = React.useState(true);
  const { setTheme, themes, resolvedTheme } = useTheme();
  React.useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon">
            <>
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const ModeToggle = () => {
  const [loading, setLoading] = React.useState(true);
  const { setTheme, themes, theme } = useTheme();

  const handleToggle = () => {
    const currentTheme = themes.indexOf(theme || "light");
    const nextTheme = (currentTheme + 1) % themes.length;
    console.log(themes[nextTheme]);
    setTheme(themes[nextTheme]);
  };
  React.useEffect(() => {
    async function loadTheme() {
      setLoading(false);
    }
    loadTheme();
  }, []);
  if (loading) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button onClick={handleToggle} variant="outline" size="icon">
              <>{theme === "system" ? <MonitorCog /> : theme === "dark" ? <Sun /> : <Moon />}</>
            </Button>
          }
        ></TooltipTrigger>
        <TooltipContent>{theme === "dark" ? "Use light mode" : "Use dark mode"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

type ColorTheme = "default" | "violet" | "pink" | "sky" | "amber";
const colors: ColorTheme[] = ["default", "violet", "pink", "sky", "amber"];

const isColorTheme = (value: string): value is ColorTheme => colors.includes(value as ColorTheme);

export function ColorToggle() {
  const [loading, setLoading] = React.useState(true);
  const [color, setColor] = React.useState<ColorTheme>("default");
  React.useEffect(() => {
    setLoading(false);
    const storedColor = localStorage.getItem("color");
    if (storedColor && isColorTheme(storedColor)) {
      setColor(storedColor);
      document.documentElement.classList.add(`theme-${storedColor}`);
    }
  }, []);
  if (loading) return null;
  function setTheme(theme: ColorTheme) {
    const html = document.documentElement;
    html.classList.remove("theme-default", "theme-violet", "theme-pink", "theme-sky", "theme-amber");
    html.classList.add(`theme-${theme}`);
    localStorage.setItem("color", theme);
    setColor(theme);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button size="icon">
            <>
              <Palette className="h-[1.2rem] w-[1.2rem]" />
            </>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {colors.map((color) => (
          <DropdownMenuItem key={color} onClick={() => setTheme(color)}>
            {color}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ModeToggle;
