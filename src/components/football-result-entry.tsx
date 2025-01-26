"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FootballResultInputProps {
  match: {
    id: string;
    players: string[];
    playersId: string[];
  };
  result: { PID: { $oid: string }; score: string }[];
  setResult: (result: any) => void;
}

export function FootballResultInput({
  match,
  result,
  setResult,
}: FootballResultInputProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-white dark:bg-gray-900 shadow-md rounded-lg">
      <div className="flex flex-col">
        <Label
          htmlFor={`team1Score-${match.id}`}
          className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate"
        >
          {match.players[0]} Score:
        </Label>
        <Input
          id={`team1Score-${match.id}`}
          type="number"
          min="0"
          className="mt-1 text-gray-800 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700"
          onChange={(e) =>
            setResult([
              { PID: { $oid: match.playersId[0] }, score: e.target.value },
              result[1] || { PID: { $oid: match.playersId[1] }, score: "0" },
            ])
          }
        />
      </div>
      <div className="flex flex-col">
        <Label
          htmlFor={`team2Score-${match.id}`}
          className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate"
        >
          {match.players[1]} Score:
        </Label>
        <Input
          id={`team2Score-${match.id}`}
          type="number"
          min="0"
          className="mt-1 text-gray-800 dark:text-gray-100 dark:bg-gray-800 dark:border-gray-700"
          onChange={(e) =>
            setResult([
              result[0] || { PID: { $oid: match.playersId[0] }, score: "0" },
              { PID: { $oid: match.playersId[1] }, score: e.target.value },
            ])
          }
        />
      </div>
    </div>
  );
}
