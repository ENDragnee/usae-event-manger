'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from 'date-fns'

interface Filters {
  status?: string;
}

interface MatchListProps {
  filters: Filters;
  onSelectMatch: (match: any) => void;
}

function MatchList({ filters, onSelectMatch }: MatchListProps) {
  interface Match {
    _id: string;
    Status: string;
    metadata: {
      type: string;
      startTime: string;
    };
    players?: { Name: string }[];
    Result: { Score: string }[];
  }

  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMatches() {
      try {
        const response = await fetch('/api/matches')
        const data = await response.json()
        setMatches(data)
      } catch (error) {
        console.error('Failed to fetch matches:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  const filteredMatches = matches.filter((match) => {
    return (
      (!filters.status || match.Status.toLowerCase() === filters.status.toLowerCase())
    )
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px] border rounded-md">
        <div className="text-gray-500">Loading matches...</div>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[500px] border rounded-md">
      <div className="p-4 space-y-4">
        {filteredMatches.map((match) => (
          <Button
            key={match._id}
            variant="outline"
            className="w-full justify-start text-left h-auto"
            onClick={() => onSelectMatch(match)}
          >
            <div className="w-full">
              <div className="font-bold">
                {match.metadata.type}
              </div>
              <div className="text-sm text-gray-500">
                {match.players?.map(player => player.Name).join(" vs ")}
              </div>
              <div className="text-sm">
                {format(new Date(match.metadata.startTime), 'yyyy-MM-dd HH:mm')}
              </div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-sm font-semibold">{match.Status}</div>
                {match.Result.length > 0 && (
                  <div className="text-sm">
                    Score: {match.Result.map(r => r.Score).join(" - ")}
                  </div>
                )}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}

export default MatchList