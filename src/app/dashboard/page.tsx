import { Suspense } from "react"
import DashboardPage from "@/components/mainDashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { ProfileSection } from "@/components/profile-section";


export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-white">Sports Festival Results</h1>
      <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
        <ProfileSection matches={[]} />
        <DashboardPage />
      </Suspense>
    </div>
  )
}