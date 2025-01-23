import { Suspense } from "react"
import DashboardPage from "@/components/mainDashboard"
import { Skeleton } from "@/components/ui/skeleton"

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sports Festival Results</h1>
      <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
        <DashboardPage />
      </Suspense>
    </div>
  )
}