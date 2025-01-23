"use client"

import { useState } from "react"
import { SearchAndFilter } from "./search-and-filter"
import  MatchList  from "./match-list"
import { ResultInput } from "./result-input"

export function Dashboard() {
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [filters, setFilters] = useState({ sport: "", team: "", status: "" })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <SearchAndFilter onFilterChange={setFilters} />
        <MatchList filters={filters} onSelectMatch={setSelectedMatch} />
      </div>
      <div>
        {selectedMatch ? (
          <ResultInput match={selectedMatch} />
        ) : (
          <div className="text-center p-4 bg-gray-100 rounded-lg">Select a match to input results</div>
        )}
      </div>
    </div>
  )
}

