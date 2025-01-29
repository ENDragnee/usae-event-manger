'use client';
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import TableSkeleton from "@/components/ui/TableSkeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ChessPlayer = {
  _id: string;
  UniID: string;
  Name: string;
  gender: string; // Ensure Gender is included in the type
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
  const [selectedGender, setSelectedGender] = useState<string>("Male"); // State for gender filter

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

  // Filter players based on selected gender
  const filteredPlayers = players.filter(player => player.gender === selectedGender);

  if (isLoading) {
    return <div className="text-center p-4">
      <TableSkeleton />
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4">
      <Select onValueChange={(value) => setSelectedGender(value)} defaultValue="Male">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <Card className="bg-secondary/5">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <TableSkeleton />
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Rank</TableHead>
              <TableHead className="whitespace-nowrap">Name</TableHead>
              <TableHead className="whitespace-nowrap">Played</TableHead>
              <TableHead className="whitespace-nowrap">Won</TableHead>
              <TableHead className="whitespace-nowrap">Drawn</TableHead>
              <TableHead className="whitespace-nowrap">Lost</TableHead>
              <TableHead className="whitespace-nowrap">Points</TableHead>
              <TableHead className="whitespace-nowrap">Win %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player, index) => (
              <TableRow key={player._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{player.Name}</TableCell>
                <TableCell>{player.played}</TableCell>
                <TableCell>{player.won}</TableCell>
                <TableCell>{player.drawn}</TableCell>
                <TableCell>{player.lost}</TableCell>
                <TableCell>{player.points}</TableCell>
                <TableCell>{player.winPercentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ChessScoreBoard;