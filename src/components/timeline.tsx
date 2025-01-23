"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface Event {
  id: string
  title: string
  startTime: string
  endTime: string
  type: "tournament" | "practice" | "general"
}

const events: Event[] = [
  {
    id: "1",
    title: "Basketball Tournament - Quarter Finals",
    startTime: "09:00",
    endTime: "10:30",
    type: "tournament",
  },
  {
    id: "2",
    title: "Team Practice",
    startTime: "11:00",
    endTime: "12:30",
    type: "practice",
  },
  // Add more events as needed
]

export function Timeline() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const hours = Array.from({ length: 14 }, (_, i) => i + 8) // 8 AM to 9 PM

  const getCurrentTimePosition = () => {
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes()
    return (hours - 8) * 80 + (minutes / 60) * 80
  }

  return (
    <Card className="p-4 bg-card text-card-foreground overflow-x-auto">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Today's Schedule</h2>
      <div className="relative min-h-[600px] min-w-[600px] bg-muted/30 rounded-lg p-4">
        <div className="absolute top-0 left-0 w-16 h-full border-r border-muted-foreground/20">
          {hours.map((hour) => (
            <div key={hour} className="relative h-20 text-sm text-muted-foreground">
              <span className="absolute -top-2.5 left-4">{`${hour.toString().padStart(2, "0")}:00`}</span>
            </div>
          ))}
        </div>

        <div className="ml-16 relative">
          {events.map((event) => (
            <Card
              key={event.id}
              className={`absolute left-0 right-4 p-2 ${
                event.type === "tournament"
                  ? "bg-primary/10 border-primary/20"
                  : event.type === "practice"
                    ? "bg-secondary/10 border-secondary/20"
                    : "bg-muted"
              }`}
              style={{
                top: `${getEventTop(event.startTime)}px`,
                height: `${getEventHeight(event.startTime, event.endTime)}px`,
              }}
            >
              <div className="flex flex-col h-full">
                <h3 className="font-medium text-sm">{event.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {event.startTime} - {event.endTime}
                </p>
              </div>
            </Card>
          ))}
          <div className="absolute left-0 right-4 h-0.5 bg-primary" style={{ top: `${getCurrentTimePosition()}px` }} />
        </div>
      </div>
    </Card>
  )
}

function getEventTop(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return (hours - 8) * 80 + (minutes / 60) * 80
}

function getEventHeight(startTime: string, endTime: string): number {
  const [startHours, startMinutes] = startTime.split(":").map(Number)
  const [endHours, endMinutes] = endTime.split(":").map(Number)
  const durationInHours = endHours - startHours + (endMinutes - startMinutes) / 60
  return durationInHours * 80
}

