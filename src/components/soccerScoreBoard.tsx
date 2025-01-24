import type React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Types (unchanged)
type Team = {
  id: number
  name: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

type BracketMatch = {
  id: number
  team1: string
  team2: string
  score1?: number
  score2?: number
}

// Mock data for multiple groups
const groupData: { [key: string]: Team[] } = {
  "Group A": [
    { id: 1, name: "Team A", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 2, points: 7 },
    { id: 2, name: "Team B", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 },
    { id: 3, name: "Team C", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, points: 4 },
    { id: 4, name: "Team D", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 8, points: 0 },
  ],
  "Group B": [
    { id: 5, name: "Team E", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 9, goalsAgainst: 1, points: 9 },
    { id: 6, name: "Team F", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 5, points: 4 },
    { id: 7, name: "Team G", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 6, points: 3 },
    { id: 8, name: "Team H", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 6, points: 1 },
  ],
  "Group C": [
    { id: 1, name: "Team A", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 2, points: 7 },
    { id: 2, name: "Team B", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 },
    { id: 3, name: "Team C", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, points: 4 },
    { id: 4, name: "Team D", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 8, points: 0 },
  ],
  "Group D": [
    { id: 5, name: "Team E", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 9, goalsAgainst: 1, points: 9 },
    { id: 6, name: "Team F", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 5, points: 4 },
    { id: 7, name: "Team G", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 6, points: 3 },
    { id: 8, name: "Team H", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 6, points: 1 },
  ],
  "Group E": [
    { id: 1, name: "Team A", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 2, points: 7 },
    { id: 2, name: "Team B", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 },
    { id: 3, name: "Team C", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, points: 4 },
    { id: 4, name: "Team D", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 8, points: 0 },
  ],
  "Group F": [
    { id: 5, name: "Team E", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 9, goalsAgainst: 1, points: 9 },
    { id: 6, name: "Team F", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 5, points: 4 },
    { id: 7, name: "Team G", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 6, points: 3 },
    { id: 8, name: "Team H", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 6, points: 1 },
  ],
  "Group G": [
    { id: 1, name: "Team A", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 2, points: 7 },
    { id: 2, name: "Team B", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 },
    { id: 3, name: "Team C", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, points: 4 },
    { id: 4, name: "Team D", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 8, points: 0 },
  ],
  "Group H": [
    { id: 5, name: "Team E", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 9, goalsAgainst: 1, points: 9 },
    { id: 6, name: "Team F", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 5, points: 4 },
    { id: 7, name: "Team G", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 6, points: 3 },
    { id: 8, name: "Team H", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 6, points: 1 },
  ],
  "Group I": [
    { id: 1, name: "Team A", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 2, points: 7 },
    { id: 2, name: "Team B", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 3, points: 6 },
    { id: 3, name: "Team C", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 4, points: 4 },
    { id: 4, name: "Team D", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 8, points: 0 },
  ],
  "Group J": [
    { id: 5, name: "Team E", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 9, goalsAgainst: 1, points: 9 },
    { id: 6, name: "Team F", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 5, points: 4 },
    { id: 7, name: "Team G", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 6, points: 3 },
    { id: 8, name: "Team H", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 6, points: 1 },
  ],
}

// Mock data for the bracket view (unchanged)
const bracketData: BracketMatch[] = [
  { id: 1, team1: "Team A", team2: "Team B", score1: 2, score2: 1 },
  { id: 2, team1: "Team C", team2: "Team D", score1: 0, score2: 0 },
  { id: 3, team1: "Team E", team2: "Team F" },
  { id: 4, team1: "Team G", team2: "Team H" },
]

const SoccerScoreBoard: React.FC = () => {
  const [view, setView] = useState<"table" | "bracket">("table")

  const TableView = () => (
    <Tabs defaultValue="Group A" className="w-full">
      <TabsList className="flex space-x-4">
        {Object.keys(groupData).map((group) => (
          <TabsTrigger key={group} value={group}>
            {group}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(groupData).map(([group, teams]) => (
        <TabsContent key={group} value={group}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>P</TableHead>
                <TableHead>W</TableHead>
                <TableHead>D</TableHead>
                <TableHead>L</TableHead>
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
                  <TableCell>{team.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      ))}
    </Tabs>
  )

  const BracketView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {bracketData.map((match) => (
        <Card key={match.id}>
          <CardHeader>
            <CardTitle>Match {match.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span>{match.team1}</span>
              <span>{match.score1 !== undefined ? match.score1 : "-"}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>{match.team2}</span>
              <span>{match.score2 !== undefined ? match.score2 : "-"}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <Button variant={view === "table" ? "default" : "outline"} onClick={() => setView("table")}>
          Table View
        </Button>
        <Button variant={view === "bracket" ? "default" : "outline"} onClick={() => setView("bracket")}>
          Bracket View
        </Button>
      </div>
      {view === "table" ? <TableView /> : <BracketView />}
    </div>
  )
}

export default SoccerScoreBoard

