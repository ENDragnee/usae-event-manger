"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import TableSkeleton from "@/components/ui/TableSkeleton"

type Match = {
  _id: string
  enrichedResults: {
    playerName: string
    score: string
    isWinner: boolean
    Status: string
  }[]
  metadata: {
    type: string
    date: string
    startTime: string
    endTime: string
    distance: string
    gender: string
  }
}

const AthleticsScoreBoard: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([])
  const [selectedDistance, setSelectedDistance] = useState<string>("100m")
  const [selectedGender, setSelectedGender] = useState<string>("Male")
  const [availableDistances, setAvailableDistances] = useState<string[]>([])
  const [availableGenders, setAvailableGenders] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAthleticsData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/athletic")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data: Match[] = await response.json()
        setMatches(data)

        // Extract unique distances and genders from the data
        const distances = [...new Set(data.map((match) => match.metadata.distance))]
        const genders = [...new Set(data.map((match) => match.metadata.gender))]
        
        setAvailableDistances(distances)
        setAvailableGenders(genders)

        // Set initial selected values
        if (distances.length > 0 && !selectedDistance) {
          setSelectedDistance(distances[0])
        }
        if (genders.length > 0 && !selectedGender) {
          setSelectedGender(genders[0])
        }
      } catch (error) {
        console.error("Error fetching athletics data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAthleticsData()
  }, [selectedDistance, selectedGender])

  // Filter matches based on selected distance and gender
  const filteredMatches = matches.filter((match) => {
    const matchesDistance = !selectedDistance || match.metadata.distance === selectedDistance
    const matchesGender = !selectedGender || match.metadata.gender === selectedGender
    return matchesDistance && matchesGender
  })

  const timeToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number)
    return hours * 3600 + minutes * 60 + seconds
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Select onValueChange={(value) => setSelectedDistance(value)} defaultValue="100m">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select distance" />
          </SelectTrigger>
          <SelectContent>
            {["100m", "200m", "400m", "4x100m", "4x400m", "800m", "1500m", "3000m"].map((distance, index) => (
              <SelectItem key={`distance-${distance}-${index}`} value={distance}>
                {distance}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setSelectedGender(value)} defaultValue="Male">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-gray-500">Showing {filteredMatches.length} matches</span>
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
      ) : filteredMatches.length === 0 ? (
        <Card className="bg-secondary/5">
          <CardContent className="p-6">
            <p className="text-center text-gray-500">No matches found for the selected filters</p>
          </CardContent>
        </Card>
      ) : (
        filteredMatches.map((match, index) => (
          <Card key={match._id} className={`overflow-hidden ${index % 2 === 0 ? "bg-primary/5" : "bg-secondary/5"}`}>
            <CardHeader>
              <CardTitle>
                {match.metadata.distance} ({match.metadata.gender}) - {new Date(match.metadata.date).toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Position</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {match.enrichedResults
                    .sort((a, b) => timeToSeconds(a.score) - timeToSeconds(b.score))
                    .map((result, idx) => (
                      <TableRow key={`${match._id}-${result.playerName}-${idx}`}>
                        <TableCell className="font-medium">{idx + 1}</TableCell>
                        <TableCell>{result.playerName}</TableCell>
                        <TableCell>{result.score}</TableCell>
                        <TableCell className="text-right">
                          {result.Status === "Eliminated" ? (
                            <span className="dark:bg-red-500 bg-red-400 text-red-100 px-3 py-1 rounded-xl">
                              Eliminated
                            </span>
                          ) : (
                            <span className="dark:bg-green-500 bg-green-400 text-green-100 px-6 py-1 rounded-xl">
                              Passed
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

export default AthleticsScoreBoard