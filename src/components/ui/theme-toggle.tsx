"use client";

import * as React from "react";
import { FaMoon, FaSun } from "react-icons/fa"
import { useTheme } from "@/components/ThemeProvider"
import { IoMdSunny } from "react-icons/io";



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
    className="rounded-full text-sm transition-all bg-transparent"
    aria-label={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
    {theme === "light" ? (
        <IoMdSunny className="text-xl text-yellow-300" />
    ) : (
        <FaMoon className="text-xl text-white -rotate-12" />
    )}
    </button>
  );
}
