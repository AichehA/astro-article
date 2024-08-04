import { Button } from "@/components/ui-shadcn/button";
import { Icons } from "@/components/core/icons";
import * as React from "react";

export function ColorModeSwitch() {
  const [theme, setThemeState] = React.useState<"light" | "dark" | "system">(
    "light"
  );

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "light");
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <div className="ml-1 mr-1">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 px-0"
        onClick={() =>
          theme === "light" ? setThemeState("dark") : setThemeState("light")
        }
      >
        <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
