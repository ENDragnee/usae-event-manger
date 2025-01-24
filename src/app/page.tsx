import SearchBar from "@/components/searchBar"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-gray-900 to-gray-800">
      <h1 className="text-4xl font-bold text-white mb-8">Insert your ID</h1>
      <SearchBar />
    </main>
  )
}