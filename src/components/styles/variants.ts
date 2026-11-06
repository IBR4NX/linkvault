
export const UI_VARIANTS = {
  container: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
  focusRing: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2",
  transition: "transition-all duration-200 ease-in-out",
  // كلاسات موحدة لمنع نزول السطر وقص النص الزائد
  singleLine: "flex-nowrap whitespace-nowrap overflow-hidden",
  truncateItem: "truncate max-w-[140px] sm:max-w-[220px] md:max-w-none",
  text: {
    heading: "font-bold tracking-tight text-slate-900 dark:text-white",
    body: "text-sm text-slate-600 dark:text-slate-300",
    muted: "text-sm text-slate-500 dark:text-slate-400",
  },
  card: "rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900",
} as const;
