'use client'

import { useState, useEffect } from "react"
import { MatchCard } from "./match-card"
import { SearchAndFilter } from "./search-and-filter"
import { MatchCardProps } from "@/types/Props"

export function MatchResultsGrid() {
  const [filters, setFilters] = useState({ type: "", status: "", search: "" })
  const [matches, setMatches] = useState<MatchCardProps[]>([])
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

  const filteredMatches = matches.filter((match: MatchCardProps) => {
    const matchSearch: string = `${match.metadata.type} ${match.players?.map((player: { Name: string }) => player.Name).join(" ") || ""}`.toLowerCase()
    
    return (
      (!filters.type || match.metadata.type.toLowerCase() === filters.type.toLowerCase()) &&
      (!filters.status || match.Status.toLowerCase() === filters.status.toLowerCase()) &&
      (!filters.search || matchSearch.includes(filters.search.toLowerCase()))
    )
  })

  const handleResultSubmit = async (id: any, result: any) => {
    try {
      const response = await fetch(`/api/matches/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Result: result, Status: 'Completed' }),
      })

      if (!response.ok) {
        throw new Error('Failed to update match result')
      }

      // Update local state
      setMatches(matches.map((match) => 
        match._id === id 
          ? { ...match, Status: 'Completed', Result: result }
          : match
      ))
    } catch (error) {
      console.error('Failed to update match result:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading matches...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <SearchAndFilter onFilterChange={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMatches.map((match: MatchCardProps) => (
          <MatchCard 
            key={match._id} 
            match={{
              id: match._id,
              type: match.players?.map((type: { Type: string }) => type.Type) || [],
              players: match.players?.map((player: { Name: string }) => player.Name) || [],
              playersId: match.players?.map((player: { _id: string }) => player._id) || [],
              date: match.metadata.date,
              startTime: match.metadata.startTime,
              endTime: match.metadata.endTime,
              status: match.Status,
              result: match.Result
            }} 
            onResultSubmit={handleResultSubmit} 
          />
        ))}
      </div>
    </div>
  )
}