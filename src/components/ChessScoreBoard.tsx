import type React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type ChessPlayer = {
  id: number
  name: string
  rating: number
  wins: number
  losses: number
  draws: number
  points: number
}

const chessData: ChessPlayer[] = [
  { id: 1, name: "Magnus Carlsen", rating: 2847, wins: 5, losses: 0, draws: 2, points: 6 },
  { id: 2, name: "Ding Liren", rating: 2788, wins: 4, losses: 1, draws: 2, points: 5 },
  { id: 3, name: "Ian Nepomniachtchi", rating: 2795, wins: 3, losses: 2, draws: 2, points: 4 },
  { id: 4, name: "Alireza Firouzja", rating: 2785, wins: 2, losses: 3, draws: 2, points: 3 },
]

const ChessScoreBoard: React.FC = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Wins</TableHead>
          <TableHead>Losses</TableHead>
          <TableHead>Draws</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {chessData.map((player) => (
          <TableRow key={player.id}>
            <TableCell>{player.name}</TableCell>
            <TableCell>{player.rating}</TableCell>
            <TableCell>{player.wins}</TableCell>
            <TableCell>{player.losses}</TableCell>
            <TableCell>{player.draws}</TableCell>
            <TableCell>{player.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ChessScoreBoard