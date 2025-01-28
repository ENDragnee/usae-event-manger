import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Roboto } from "next/font/google"
import SearchBar from "@/components/searchBar";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sport Event Manager",
  description: "A sport management system made by ASCII Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider>
        <main className="flex-grow">
          <header className="w-[90%] flex flex-col justify-between sm:flex-row my-6 mx-auto sm:mb-10 gap-4 sm:gap-0">
            <Link href={"/"}><h1 className={`text-2xl sm:text-3xl font-bold dark:text-white ${roboto.variable}`}>USAE-EVENTS</h1></Link>
            <SearchBar />
            <ThemeToggle />
          </header>
          {children}   
        </main>
        <footer className="relative bottom-0 left-0 right-0 p-4 border-t border-[#cccccc] dark:border-blue-300 text-center shadow-lg">
          <p className="text-base font-medium">
            &copy; ASCII Technologies <span className="text-[#b8860b]">2024</span>
          </p>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
