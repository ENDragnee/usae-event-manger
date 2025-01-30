"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchComponent() {
  const [playerId, setPlayerId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSearch = async () => {
    try {
      setError(null);

      // Fetch player data
      const playerRes = await fetch("/api/searchPlayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId }),
      });

      const playerData = await playerRes.json();
      if (playerRes.status !== 200) {
        throw new Error(playerData.error || "Failed to find player");
      }

      // Fetch matches data
      const matchRes = await fetch("/api/fetchMatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId: playerData.playerId }),
      });

      const matchData = await matchRes.json();
      if (matchRes.status !== 200) {
        throw new Error(matchData.error || "Failed to fetch matches");
      }

      // Filter matches with the "Up-Coming" status
      const filteredMatches = matchData.matches.filter(
        (match: any) => match.Status === "Up-Coming"
      );

      // Redirect to Dashboard with matches as query parameters
      const encodedMatches = encodeURIComponent(JSON.stringify(filteredMatches));
      router.push(`/dashboard?matches=${encodedMatches}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Enter Player ID"
          className="bg-transparent border focus:border-gray-400 border-gray-700 text-black dark:text-white rounded-lg px-4 md:px-6 py-1 outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-transparent border focus:border-gray-400 border-gray-700 dark:text-white px-2 py-1 rounded-lg hover:bg-gray-500 hover:text-white"  
        >
          Search
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
