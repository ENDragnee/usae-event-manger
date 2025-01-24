import type React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Athlete = {
  id: number
  name: string
  event: string
  result: string
  rank: number
}

const athleticsData: Athlete[] = [
  { id: 1, name: "John Doe", event: "100m", result: "9.98s", rank: 1 },
  { id: 2, name: "Jane Smith", event: "100m", result: "10.12s", rank: 2 },
  { id: 3, name: "Mike Johnson", event: "400m", result: "44.52s", rank: 1 },
  { id: 4, name: "Sarah Brown", event: "400m", result: "45.01s", rank: 2 },
  { id: 5, name: "Team USA", event: "4X100m", result: "37.45s", rank: 1 },
  { id: 6, name: "Team Jamaica", event: "4X100m", result: "37.68s", rank: 2 },
  { id: 7, name: "Team GB", event: "4X400m", result: "2:57.84", rank: 1 },
  { id: 8, name: "Team Canada", event: "4X400m", result: "2:58.12", rank: 2 },
  { id: 9, name: "David Miller", event: "1500m", result: "3:32.45", rank: 1 },
  { id: 10, name: "Hassan Ali", event: "1500m", result: "3:32.98", rank: 2 },
]

const events = ["100m", "400m", "4X100m", "4X400m", "1500m"]

const AthleticsScoreBoard: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0])

  const filteredData = athleticsData.filter((athlete) => athlete.event === selectedEvent)

  return (
    <div className="space-y-4">
      <Select onValueChange={setSelectedEvent} defaultValue={selectedEvent}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select event" />
        </SelectTrigger>
        <SelectContent>
          {events.map((event) => (
            <SelectItem key={event} value={event}>
              {event}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((athlete) => (
            <TableRow key={athlete.id}>
              <TableCell>{athlete.rank}</TableCell>
              <TableCell>{athlete.name}</TableCell>
              <TableCell>{athlete.event}</TableCell>
              <TableCell>{athlete.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AthleticsScoreBoard