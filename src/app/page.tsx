"use client";
import SearchBar from "@/components/searchBar";
import ScoreBoard from "@/components/scoreBoard";
import { useTheme } from "@/components/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";
import { Roboto } from "next/font/google";
import HeroSection from "@/components/HeroSection";

const roboto = Roboto({
  subsets: ['latin'], // Add specific subsets (e.g., 'latin', 'latin-ext', etc.)
  weight: ['400', '700'], // Specify font weights
  style: ['normal', 'italic'], // Optional: Specify styles
  variable: '--font-roboto', // Optional: Set a CSS variable
});

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  return (
    <main className="min-h-screen flex-col items-center justify-center px-24 py-10">
      <div className="flex justify-between w-full mb-10">
        <h1 className={`text-3xl font-bold dark:text-white {roboto.variable}`}>USAE-EVENTS</h1>
        <div className="flex space-x-3">
          <button
            onClick={toggleTheme}
            className="rounded-full px-2 py-2 text-sm transition-all"
          >
            {theme === "light" ? (
              <FaSun className="text-xl text-yellow-300" title="Switch to Light Mode" />
            ) : (
              <FaMoon className="text-xl text-white -rotate-12" title="Switch to Dark Mode" />
            )}
          </button>
          <SearchBar />
        </div>
      </div>
      <HeroSection />
      <ScoreBoard />
    </main>
  );
}
