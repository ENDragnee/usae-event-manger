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
      <HeroSection />
      <ScoreBoard />
    </main>
  )
}

