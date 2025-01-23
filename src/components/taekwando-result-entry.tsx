"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TaekwondoResultInputProps {
  match: any; // Replace with the actual type of match
  setResult: (result: any) => void; // Replace with the correct type for result
}

export function TaekwondoResultInput({ match, setResult }: TaekwondoResultInputProps) {
  const [result, updateResult] = useState<any[]>([]); // Use appropriate type

  const handleResultChange = (playerIndex: number, round: number, value: string) => {
    const updatedResult = [...result];
    updatedResult[playerIndex + 2 * (round - 1)] = {
      PID: { $oid: match.playersId[playerIndex] },
      player: match.players[playerIndex],
      round,
      score: value,
    };
    updateResult(updatedResult);
    setResult(updatedResult);
  };

  return (
    <div className="space-y-4">
      {[1, 2, 3].map((round) => (
        <div key={round} className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`player1Round${round}-${match.id}`}>
              {match.players[0]} Round {round}
            </Label>
            <Input
              id={`player1Round${round}-${match.id}`}
              type="number"
              min="0"
              onChange={(e) => handleResultChange(0, round, e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`player2Round${round}-${match.id}`}>
              {match.players[1]} Round {round}
            </Label>
            <Input
              id={`player2Round${round}-${match.id}`}
              type="number"
              min="0"
              onChange={(e) => handleResultChange(1, round, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
