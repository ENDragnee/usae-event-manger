"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Event {
  id: string
  title: string
  date: string
  time: string
  type: string
  description: string
  location: string
}

const events: Event[] = [
  {
    id: "1",
    title: "Basketball Tournament - Semi Finals",
    date: "2024-01-24",
    time: "14:00",
    type: "Tournament",
    description: "Semi-final match against Team Eagles. Winner advances to the finals.",
    location: "Main Court",
  },
]

export function UpcomingEvents() {
  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {events.map((event) => (
            <AccordionItem key={event.id} value={event.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-start text-left">
                    <div className="font-semibold">{event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                  </div>
                  <Badge variant="secondary">{event.type}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <div className="text-sm">
                    <span className="font-semibold">Location:</span> {event.location}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

