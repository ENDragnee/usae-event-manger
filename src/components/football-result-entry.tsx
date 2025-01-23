"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FootballResultInputProps {
  match: {
    id: string
    players: string[]
    playersId: string[]
  }
  result: { PID: { $oid: string }; score: string }[]
  setResult: (result: any) => void;
}

export function FootballResultInput({ match, result, setResult }: FootballResultInputProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor={`team1Score-${match.id}`}>{match.players[0]} Score</Label>
        <Input
          id={`team1Score-${match.id}`}
          type="number"
          min="0"
          onChange={(e) =>
            setResult([
              { PID: { $oid: match.playersId[0] }, score: e.target.value },
              result[1] || { PID: { $oid: match.playersId[1] }, score: "0" },
            ])
          }
        />
      </div>
      <div>
        <Label htmlFor={`team2Score-${match.id}`}>{match.players[1]} Score</Label>
        <Input
          id={`team2Score-${match.id}`}
          type="number"
          min="0"
          onChange={(e) =>
            setResult([
              result[0] || { PID: { $oid: match.playersId[0] }, score: "0" },
              { PID: { $oid: match.playersId[1] }, score: e.target.value },
            ])
          }
        />
      </div>
    </div>
  )
}
