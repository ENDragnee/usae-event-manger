"use client";

import * as React from "react";
import { FaMoon, FaSun } from "react-icons/fa"
import { useTheme } from "@/components/ThemeProvider"



export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent SSR mismatch

    function handleToggleTheme(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        toggleTheme();
    }
  return (
    <button
    onClick={handleToggleTheme}
    className="rounded-full p-2 text-sm transition-all"
    aria-label={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
    {theme === "light" ? (
        <FaSun className="text-xl text-yellow-300" />
    ) : (
        <FaMoon className="text-xl text-white -rotate-12" />
    )}
    </button>
  );
}
