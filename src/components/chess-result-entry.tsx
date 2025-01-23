"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

interface ChessResultInputProps {
  match: {
    id: string;
    players: string[];
    playersId: string[];
  };
  setResult: (result: any) => void;
}

export function ChessResultInput({ match, setResult }: ChessResultInputProps) {
  return (
    <RadioGroup
      onValueChange={(value) => {
        const resultObj = [
          {
            winner: value === "win1" ? match.players[0] : value === "win2" ? match.players[1] : "draw",
            PID: {
              $oid: value === "win1" ? match.playersId[0] : value === "win2" ? match.playersId[1] : "draw",
            },
          },
          {
            loser: value === "win1" ? match.players[1] : value === "win2" ? match.players[0] : "draw",
            PID: {
              $oid: value === "win1" ? match.playersId[1] : value === "win2" ? match.playersId[0] : "draw",
            },
          },
        ];
        setResult(resultObj);
      }}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="win1" id={`win1-${match.id}`} />
        <Label htmlFor={`win1-${match.id}`}>{match.players[0]} Wins</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="win2" id={`win2-${match.id}`} />
        <Label htmlFor={`win2-${match.id}`}>{match.players[1]} Wins</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="draw" id={`draw-${match.id}`} />
        <Label htmlFor={`draw-${match.id}`}>Draw</Label>
      </div>
    </RadioGroup>
  );
}
