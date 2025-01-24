"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TournamentInfo } from "@/components/tournament-info";
import { UpcomingEvents } from "@/components/upcoming-events";
import { DailyProgram } from "@/components/daily-program";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const matches = searchParams.get("matches")
    ? JSON.parse(decodeURIComponent(searchParams.get("matches")!))
    : [];

  return (
    <div className="space-y-4">
      <header className="py-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tigh text-white">
          Welcome, Athlete
        </h1>
        <p className="text-white">Your personal sports festival dashboard</p>
      </header>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-3 gap-4 w-[70%] mx-auto">
          <TabsTrigger value="tournament">Tournament</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="daily">Daily Program</TabsTrigger>
        </TabsList>

        <TabsContent value="tournament" className="space-y-4">
          <TournamentInfo />
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <UpcomingEvents matches={matches} />
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <DailyProgram />
        </TabsContent>
      </Tabs>
    </div>
  );
}
