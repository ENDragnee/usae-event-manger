"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
            isWinner: value === "win1",
            player: match.players[0],
            PID: {
              $oid: match.playersId[0],
            },
          },
          {
            isWinner: value === "win2",
            player: match.players[1],
            PID: {
              $oid: match.playersId[1],
            },
          },
        ];

        // If it's a draw, set both players' `isWinner` to false
        if (value === "draw") {
          resultObj[0].isWinner = false;
          resultObj[1].isWinner = false;
        }

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
