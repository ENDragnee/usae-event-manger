"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface DailyEvent {
  id: string
  title: string
  time: string
  type: "tournament" | "practice" | "general"
  location: string
}

const dailyEvents: DailyEvent[] = [
  {
    id: "1",
    title: "Morning Warm-up",
    time: "08:00",
    type: "practice",
    location: "Training Field",
  },
  {
    id: "2",
    title: "Basketball Tournament - Quarter Finals",
    time: "09:00",
    type: "tournament",
    location: "Main Court",
  },
  {
    id: "3",
    title: "Team Strategy Meeting",
    time: "12:00",
    type: "general",
    location: "Meeting Room 2",
  },
  {
    id: "4",
    title: "Recovery Session",
    time: "15:00",
    type: "practice",
    location: "Gym",
  },
]

export function DailyProgram() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Program</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {dailyEvents.map((event) => (
              <Card key={event.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge
                        variant={
                          event.type === "tournament" ? "default" : event.type === "practice" ? "secondary" : "outline"
                        }
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                  <div className="text-sm font-medium">{event.time}</div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

