"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ChessResultInput } from "@/components/chess-result-entry"
import { TaekwondoResultInput } from "@/components/taekwando-result-entry"
import { FootballResultInput } from "@/components/football-result-entry"

interface MatchCardProps {
  match: {
    id: string;
    type: string[];
    players: string[];
    playersId: string[];
    date: string;
    startTime: string;
    endTime?: string;
    teams?: string[];
    event?: string;
    status: string;
    result?: string;
    gender?: string; // Add the result property here
    distance?: string; // Add the result property here
  };
  onResultSubmit: (matchId: string, result: any) => void;
}

export function MatchCard({ match, onResultSubmit }: MatchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [result, setResult] = useState<{ PID: { $oid: string }; score: string; isWinner?: boolean }[]>([])
  const { toast } = useToast()

  const [rankedRunners, setRankedRunners] = useState<{ name: string; PID: { $oid: string }; time?: string; score?: string }[]>([])
  const [unrankedRunners, setUnrankedRunners] = useState(
    match.type[0] === "Athletics" ? match.players.map((name, index) => ({
      name: name,
      id: match.playersId[index]
    })) : []
  )

  const handleRunnerClick = (runner: any) => {
    setUnrankedRunners(unrankedRunners.filter((r) => r !== runner))
    setRankedRunners([...rankedRunners, { 
      name: runner.name,
      PID: { $oid: runner.id },
    }])
  }

  const handleRankedRunnerClick = (index: any) => {
    const runner = rankedRunners[index]
    setRankedRunners(rankedRunners.filter((_, i) => i !== index))
    setUnrankedRunners([...unrankedRunners, {
      name: runner.name,
      id: runner.PID.$oid
    }])
  }

  const handleTimeChange = (index : number, time: string) => {
    const updatedRunners = [...rankedRunners]
    updatedRunners[index] = {
      ...updatedRunners[index],
      time,
      score: time
    }
    setRankedRunners(updatedRunners)
  }

  const handleAthleticsSubmit = async (e: any) => {
    e.preventDefault();

    if (rankedRunners.length === match.players.length) {
      const allHaveTimes = rankedRunners.every((runner) => runner.time);
      if (!allHaveTimes) {
        alert("Please enter times for all runners");
        return;
      }

      // Prepare the results with updated statuses
      const finalResults = rankedRunners.map((runner, index) => ({
        PID: runner.PID,
        score: runner.time,
        status: index < 4 ? "Pending" : "Eliminated", // Top 4: Pending, others: Eliminated
      }));

      // Update database via API route
      try {
        const res = await fetch(`/api/update-status/athlete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ matchId: match.id, results: finalResults, gender: match.gender, distance: match.distance }),
        });

        if (res.ok) {
          onResultSubmit(match.id, finalResults);
          toast({
            title: "Result submitted successfully",
            description: "The match result has been recorded.",
          });
          setIsExpanded(false);
        } else {
          throw new Error("Failed to update status");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred while updating statuses.",
          variant: "destructive",
        });
      }
    }
  };

  const handleReset = () => {
    setRankedRunners([])
    setUnrankedRunners(match.players.map((name, index) => ({
      name: name,
      id: match.playersId[index]
    })))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (match.type[0] === "Athletics") {
      handleAthleticsSubmit(e)
      return
    }

    // Handle other sports as before
    if (Array.isArray(result) && result.length > 0 && match.type[0] !== "Chess") {
      const maxScore = Math.max(...result.map((entry) => parseFloat(entry.score) || 0))
      const updatedResult = result.map((entry, index) => ({
        PID: { $oid: match.playersId[index] },
        score: entry.score || "0",
        isWinner: parseFloat(entry.score) === maxScore,
      }))
      setResult(updatedResult)
      onResultSubmit(match.id, updatedResult)
    } else {
      onResultSubmit(match.id, result)
    }

    setIsExpanded(false)
    toast({
      title: "Result submitted successfully",
      description: "The match result has been recorded.",
    })
  }

  const renderResultInput = () => {
    switch (match.type[0]) {
      case "Football":
        return <FootballResultInput match={match} result={result} setResult={setResult} />
      case "Chess":
        return <ChessResultInput match={match} setResult={setResult} />;
      case "Gebeta":
        return <ChessResultInput match={match} setResult={setResult} />;
      case "Taekwondo":
        return <TaekwondoResultInput match={match} setResult={setResult} />;
      case "Athletics":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Unranked Athletes</Label>
              <div className="flex flex-wrap gap-2">
                {unrankedRunners.map((runner: any) => (
                  <Button
                    key={runner.id}
                    type="button"
                    variant="outline"
                    onClick={() => handleRunnerClick(runner)}
                  >
                    {runner.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ranked Athletes</Label>
              <div className="space-y-2">
                {rankedRunners.map((runner, index) => (
                  <div key={runner.PID.$oid} className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => handleRankedRunnerClick(index)}
                      className={`w-full justify-start ${
                        index === 0 ? "bg-yellow-200 hover:bg-yellow-300" :
                        index === 1 ? "bg-gray-200 hover:bg-gray-300" :
                        index === 2 ? "bg-orange-200 hover:bg-orange-300" : ""
                      }`}
                    >
                      {index + 1}. {runner.name}
                    </Button>
                    <Input
                      type="text"
                      placeholder="MM:SS.ms"
                      value={runner.time || ""}
                      onChange={(e) => handleTimeChange(index, e.target.value)}
                      className="w-32"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {rankedRunners.length === match.players.length && (
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Submit Result
                </Button>
                <Button type="button" onClick={handleReset} variant="outline" className="flex-1">
                  Reset
                </Button>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className={`transition-all duration-300 ${isExpanded ? "ring-2 ring-primary" : ""}`}>
      <CardHeader>
        <CardTitle>{match.type[0]}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {match.date} {match.startTime} {match?.gender} {match?.distance} {match.type[0]}
        </p>
        <p className="font-medium">
          {match.teams ? match.teams.join(" vs ") : match.players ? match.players.join(" vs ") : match.event}
        </p>
        <p className="text-sm font-semibold mt-2">Status: {match.status}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        {!isExpanded && match.status !== "Completed" && (
          <Button onClick={() => setIsExpanded(true)} className="w-full">
            Enter Result
          </Button>
        )}
        {isExpanded && (
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {renderResultInput()}
            {match.type[0] !== "Athletics" && (
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Submit Result
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsExpanded(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            )}
          </form>
        )}
      </CardFooter>
    </Card>
  )
}
