"use client"
import SearchBar from "@/components/searchBar"
import ScoreBoard from "@/components/scoreBoard"
import { Roboto } from "next/font/google"
import HeroSection from "@/components/HeroSection"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
})

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-24 py-6 sm:py-8 md:py-10">
      <div className="flex flex-col sm:flex-row justify-between w-full mb-6 sm:mb-10 gap-4 sm:gap-0">
        <h1 className={`text-2xl sm:text-3xl font-bold dark:text-white ${roboto.variable}`}>USAE-EVENTS</h1>
        <div className="flex items-center space-x-3">
          <SearchBar />
        </div>
      </div>
      <HeroSection />
      <ScoreBoard />
    </main>
  )
}

