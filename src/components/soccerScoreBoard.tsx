import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Team = {
  Group: string;
  id: string;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  GoalAgainst: number;
  GoalFor: number;
  points: number;
};

const GroupTable = () => {
  const [selectedGroup, setSelectedGroup] = useState("A");
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [displayedTeams, setDisplayedTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAndFormatData = (data: any[]) => {
    return data.map((team: any) => ({
      id: team.UniID || String(Math.random()),
      name: team.Name || "Unknown Team",
      played: Number(team.played) || 0,
      won: Number(team.won) || 0,
      drawn: Number(team.drawn) || 0,
      lost: Number(team.lost) || 0,
      gd: Number(team.gd) || 0,
      points: Number(team.points) || 0,
      Group: team.Group || "A",
      GoalFor: Number(team.goalsFor) || 0,
      GoalAgainst: Number(team.goalsAgainst) || 0,
    }));
  };  

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      setError(null);
    
      try {
        const response = await fetch("/api/groups", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Fetched Data:", data); // Log fetched data
        const formattedData = fetchAndFormatData(data);
        setAllTeams(formattedData);
      } catch (error) {
        console.error("Error fetching group data:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };    

    fetchInitialData();
  }, []);

  const handleGroupChange = (group: string) => {
    setSelectedGroup(group);
    const filteredTeams = allTeams.filter(team => 
      team.Group?.toUpperCase().trim() === group.toUpperCase().trim()
    );

    const sortedTeams = filteredTeams.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return b.gd - a.gd;
    });

    setDisplayedTeams(sortedTeams);
  };

  useEffect(() => {
    handleGroupChange(selectedGroup);
  }, [allTeams, selectedGroup]);

  return (
    <Tabs defaultValue="A" onValueChange={handleGroupChange}>
      <div className="overflow-x-auto scrollbar-hide">
        <TabsList className="flex gap-4 min-w-max px-4 md:justify-around mb-4">
          {Array.from({ length: 16 }, (_, i) => (
            <TabsTrigger
              key={String.fromCharCode(65 + i)}
              value={String.fromCharCode(65 + i)}
              className="flex-grow sm:flex-grow-0"
            >
              Group {String.fromCharCode(65 + i)}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent value={selectedGroup}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Team</TableHead>
                <TableHead className="text-center">P</TableHead>
                <TableHead className="text-center">W</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead className="text-center">GD</TableHead>
                <TableHead className="text-center">GF</TableHead>
                <TableHead className="text-center">GA</TableHead>
                <TableHead className="text-center">Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 9 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <div className="h-4 w-full bg-muted/30 animate-pulse rounded"></div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : displayedTeams.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No teams found in this group
                  </TableCell>
                </TableRow>
              ) : (
                displayedTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>{team.name}</TableCell>
                    <TableCell className="text-center">{team.played}</TableCell>
                    <TableCell className="text-center">{team.won}</TableCell>
                    <TableCell className="text-center">{team.drawn}</TableCell>
                    <TableCell className="text-center">{team.lost}</TableCell>
                    <TableCell className="text-center">{team.gd}</TableCell>
                    <TableCell className="text-center">{team.GoalFor}</TableCell>
                    <TableCell className="text-center">{team.GoalAgainst}</TableCell>
                    <TableCell className="text-center">{team.points}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default GroupTable;