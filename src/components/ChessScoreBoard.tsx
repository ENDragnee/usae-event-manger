'use client';
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import TableSkeleton from "@/components/ui/TableSkeleton"

type ChessPlayer = {
  _id: string;
  UniID: string;
  Name: string;
  rating: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  winPercentage: number;
}

const ChessScoreBoard = () => {
  const [players, setPlayers] = useState<ChessPlayer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChessData = async () => {
      try {
        const response = await fetch('/api/chess'); // Adjust the API endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChessData();
  }, []);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        <Card className="bg-secondary/5">
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <TableSkeleton />
        </CardContent>
      </Card>
      ) :
      (<Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Rank</TableHead>
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead className="whitespace-nowrap">Rating</TableHead>
            <TableHead className="whitespace-nowrap">Played</TableHead>
            <TableHead className="whitespace-nowrap">Won</TableHead>
            <TableHead className="whitespace-nowrap">Drawn</TableHead>
            <TableHead className="whitespace-nowrap">Lost</TableHead>
            <TableHead className="whitespace-nowrap">Points</TableHead>
            <TableHead className="whitespace-nowrap">Win %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={player._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{player.Name}</TableCell>
              <TableCell>{player.rating}</TableCell>
              <TableCell>{player.played}</TableCell>
              <TableCell>{player.won}</TableCell>
              <TableCell>{player.drawn}</TableCell>
              <TableCell>{player.lost}</TableCell>
              <TableCell>{player.points}</TableCell>
              <TableCell>{player.winPercentage}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>)
      }

    </div>
  );
};

export default ChessScoreBoard;