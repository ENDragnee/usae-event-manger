import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type GebetaPlayer = {
  id: number
  name: string
  wins: number
  losses: number
  seeds: number
  points: number
}

const gebetaData: GebetaPlayer[] = [
  { id: 1, name: "Player A", wins: 5, losses: 1, seeds: 48, points: 15 },
  { id: 2, name: "Player B", wins: 4, losses: 2, seeds: 42, points: 12 },
  { id: 3, name: "Player C", wins: 3, losses: 3, seeds: 36, points: 9 },
  { id: 4, name: "Player D", wins: 2, losses: 4, seeds: 30, points: 6 },
]

const GebetaScoreBoard: React.FC = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Wins</TableHead>
          <TableHead>Losses</TableHead>
          <TableHead>Seeds</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gebetaData.map((player) => (
          <TableRow key={player.id}>
            <TableCell>{player.name}</TableCell>
            <TableCell>{player.wins}</TableCell>
            <TableCell>{player.losses}</TableCell>
            <TableCell>{player.seeds}</TableCell>
            <TableCell>{player.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default GebetaScoreBoard

