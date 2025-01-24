import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type TaekwondoAthlete = {
  id: number
  name: string
  weightClass: string
  wins: number
  losses: number
  points: number
}

const taekwondoData: TaekwondoAthlete[] = [
  { id: 1, name: "Kim Lee", weightClass: "Flyweight", wins: 3, losses: 0, points: 15 },
  { id: 2, name: "Park Ji-sung", weightClass: "Featherweight", wins: 2, losses: 1, points: 10 },
  { id: 3, name: "Choi Min-ho", weightClass: "Welterweight", wins: 2, losses: 1, points: 10 },
  { id: 4, name: "Lee Sun-hee", weightClass: "Middleweight", wins: 1, losses: 2, points: 5 },
]

const TaekwondoScoreBoard: React.FC = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Weight Class</TableHead>
          <TableHead>Wins</TableHead>
          <TableHead>Losses</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {taekwondoData.map((athlete) => (
          <TableRow key={athlete.id}>
            <TableCell>{athlete.name}</TableCell>
            <TableCell>{athlete.weightClass}</TableCell>
            <TableCell>{athlete.wins}</TableCell>
            <TableCell>{athlete.losses}</TableCell>
            <TableCell>{athlete.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TaekwondoScoreBoard

