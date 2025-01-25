import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Team = {
  id: string;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
};

const GroupTable: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState("Group A");
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroupData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/groups/${selectedGroup}`);
        const data = await response.json();
        // Map the fetched data to the Team type if needed
        const formattedData = data.map((team: any) => ({
          id: team.UniID,
          name: team.Name,
          played: team.played,
          won: team.win,
          drawn: team.draw,
          lost: team.lose,
          goalsFor: team.gd, // Adjust to proper goals data
          goalsAgainst: 0, // Add logic for goalsAgainst if available
          points: parseInt(team.win) * 3 + parseInt(team.draw), // Calculate points
        }));
        setTeams(formattedData);
      } catch (error) {
        console.error("Error fetching group data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [selectedGroup]);

  return (
    <Tabs defaultValue="Group A" onValueChange={setSelectedGroup}>
      <TabsList className="flex justify-center items-center">
        <TabsTrigger value="Group A">Group A</TabsTrigger>
        <TabsTrigger value="Group B">Group B</TabsTrigger>
        <TabsTrigger value="Group C">Group C</TabsTrigger>
      </TabsList>
      <TabsContent value={selectedGroup}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>P</TableHead>
                <TableHead>W</TableHead>
                <TableHead>D</TableHead>
                <TableHead>L</TableHead>
                <TableHead>GD</TableHead>
                <TableHead>Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.played}</TableCell>
                  <TableCell>{team.won}</TableCell>
                  <TableCell>{team.drawn}</TableCell>
                  <TableCell>{team.lost}</TableCell>
                  <TableCell>{team.goalsFor}</TableCell>
                  <TableCell>{team.goalsAgainst}</TableCell>
                  <TableCell>{team.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default GroupTable;
