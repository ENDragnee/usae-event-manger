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
  const [viewMode, setViewMode] = useState<"league" | "tournament">("league");

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

  const TournamentBracket = () => (
    <div className="p-4">
      <div className="flex justify-between items-start gap-8 overflow-x-auto">
        {/* Round of 16 */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold">Round of 16</h3>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border dark:border-cyan-50 p-2 w-40 rounded-lg">
              <div className="border-b dark:border-cyan-50 pb-1 mb-1">Team A</div>
              <div>Team B</div>
            </div>
          ))}
        </div>

        {/* Quarter Finals */}
        <div className="flex flex-col gap-4 mt-32">
          <h3 className="text-sm font-semibold">Quarter Finals</h3>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border dark:border-cyan-50 p-2 w-40 rounded-lg">
              <div className="border-b dark:border-cyan-50 pb-1 mb-1">Winner R16 {i*2 + 1}</div>
              <div>Winner R16 {i*2 + 2}</div>
            </div>
          ))}
        </div>

        {/* Semi Finals */}
        <div className="flex flex-col gap-4 mt-52">
          <h3 className="text-sm font-semibold">Semi Finals</h3>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="border dark:border-cyan-50 p-2 w-40 rounded-lg">
              <div className="border-b dark:border-cyan-50 pb-1 mb-1">Winner QF {i*2 + 1}</div>
              <div>Winner QF {i*2 + 2}</div>
            </div>
          ))}
        </div>

        {/* Final */}
        <div className="flex flex-col gap-4 mt-64">
          <h3 className="text-sm font-semibold">Final</h3>
          <div className="border dark:border-cyan-50 p-2 w-40 rounded-lg">
            <div className="border-b dark:border-cyan-50 pb-1 mb-1">Winner SF 1</div>
            <div>Winner SF 2</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <select
        value={viewMode}
        onChange={(e) => setViewMode(e.target.value as "league" | "tournament")}
        className="mb-4 p-2 border rounded dark:bg-inherit"
      >
        <option value="league" className="bg-inherit  mx">League View</option>
        <option value="tournament" className="bg-inherit">Tournament View</option>
      </select>

      {viewMode === "league" ? (
        <Tabs defaultValue="A" onValueChange={handleGroupChange}>
          <div className="overflow-x-auto scrollbar-hide">
            <TabsList className="flex gap-4 min-w-max px-4 md:justify-around mb-4">
              {Array.from({ length: 15 }, (_, i) => (
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
      ) : (
        <TournamentBracket />
      )}
    </div>
  );
};

export default GroupTable;