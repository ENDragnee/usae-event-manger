"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Metadata {
  type: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface Event {
  _id: { $oid: string };
  PlayersId: { $oid: string }[];
  Result: { PID: { $oid: string } }[];
  Status: string;
  metadata: Metadata;
}

interface UpcomingEventsProps {
  matches: Event[];
}

export function UpcomingEvents({ matches }: UpcomingEventsProps) {
  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {matches.map((event) => {
            const formattedDate = event.metadata.date
              ? new Date(event.metadata.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Date not available";

            const startTime = event.metadata.startTime || "Time not available";

            return (
              <AccordionItem key={event._id.$oid} value={event._id.$oid}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-start text-left">
                      <div className="font-semibold">{event.metadata.type}</div>
                      <div className="text-sm text-muted-foreground">
                        {formattedDate} at {startTime}
                      </div>
                    </div>
                    <Badge variant="secondary">{event.Status}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    <p className="text-sm text-muted-foreground">
                      Event Status: <strong>{event.Status}</strong>
                    </p>
                    <div className="text-sm">
                      <span className="font-semibold">Players:</span>{" "}
                      {event.PlayersId.map((player) => player.$oid).join(", ")}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Results:</span>{" "}
                      {event.Result.map((result, index) => (
                        <span key={index}>{result.PID.$oid}</span>
                      )).join(", ")}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
