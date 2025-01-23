import { useState, useEffect } from "react"

// This is a mock API call. In a real application, you'd fetch data from your backend.
const fetchMatches = async () => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      sport: "Football",
      participants: "Team A vs Team B",
      dateTime: "2023-06-01 15:00",
      team1: "Team A",
      team2: "Team B",
      status: null,
    },
    {
      id: 2,
      sport: "Chess",
      participants: "Player 1 vs Player 2",
      dateTime: "2023-06-01 16:00",
      player1: "Player 1",
      player2: "Player 2",
      status: null,
    },
    {
      id: 3,
      sport: "Taekwondo",
      participants: "Fighter A vs Fighter B",
      dateTime: "2023-06-01 17:00",
      player1: "Fighter A",
      player2: "Fighter B",
      status: null,
    },
    {
      id: 4,
      sport: "Athletics",
      participants: "Runner 1, Runner 2, Runner 3",
      dateTime: "2023-06-02 10:00",
      participants: ["Runner 1", "Runner 2", "Runner 3"],
      status: null,
    },
  ]
}

export function useMatches() {
  const [matches, setMatches] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMatches()
      .then((data) => {
        setMatches(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err)
        setIsLoading(false)
      })
  }, [])

  const updateMatchStatus = (matchId, status) => {
    setMatches((prevMatches) => prevMatches.map((match) => (match.id === matchId ? { ...match, status } : match)))
  }

  const reorderMatches = (startIndex, endIndex) => {
    const result = Array.from(matches)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    setMatches(result)
  }

  const filterMatches = ({ search, sport }) => {
    return matches.filter(
      (match) =>
        (!search || match.participants.toLowerCase().includes(search.toLowerCase())) &&
        (!sport || match.sport === sport),
    )
  }

  return { matches, isLoading, error, filterMatches, updateMatchStatus, reorderMatches }
}

