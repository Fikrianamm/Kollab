import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function FancyModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-background hover:bg-muted/20 transition-colors duration-300 border border-muted">
      <span className="text-sm font-medium mr-2">Theme:</span>
      <div className="flex bg-muted rounded-full p-1">
        <button
          onClick={() => setTheme("light")}
          className={`flex items-center justify-center rounded-full w-8 h-8 transition-all duration-300 ease-spring ${
            theme === "light" 
              ? "bg-white text-yellow-500 shadow-lg scale-110" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Light mode"
        >
          <Sun className={`h-4 w-4 transition-transform duration-500 ${theme === "light" ? "rotate-0 scale-110" : "rotate-90 scale-90"}`} />
        </button>
        
        <button
          onClick={() => setTheme("dark")}
          className={`flex items-center justify-center rounded-full w-8 h-8 transition-all duration-300 ease-spring ${
            theme === "dark" 
              ? "bg-slate-800 text-blue-400 shadow-lg scale-110" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Dark mode"
        >
          <Moon className={`h-4 w-4 transition-transform duration-500 ${theme === "dark" ? "rotate-0 scale-110" : "-rotate-90 scale-90"}`} />
        </button>
        
        <button
          onClick={() => setTheme("system")}
          className={`flex items-center justify-center rounded-full w-8 h-8 transition-all duration-300 ease-spring ${
            theme === "system" 
              ? "bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-700 dark:to-slate-900 shadow-lg scale-110" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="System preference"
        >
          <Monitor className={`h-4 w-4 transition-transform duration-500 ${theme === "system" ? "rotate-0 scale-110" : "rotate-180 scale-90"}`} />
        </button>
      </div>
    </div>
  );
}