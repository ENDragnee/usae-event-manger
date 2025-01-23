import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline } from "@/components/timeline"
import { TournamentInfo } from "@/components/tournament-info"
import { UpcomingEvents } from "@/components/upcoming-events"
import { DailyProgram } from "@/components/daily-program"

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <header className="py-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome, Athlete</h1>
        <p className="text-white">Your personal sports festival dashboard</p>
      </header>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="tournament">Tournament</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="daily">Daily Program</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Timeline />
        </TabsContent>

        <TabsContent value="tournament" className="space-y-4">
          <TournamentInfo />
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <UpcomingEvents />
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <DailyProgram />
        </TabsContent>
      </Tabs>
    </div>
  )
}

