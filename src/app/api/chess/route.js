import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("usae-sport");

    // Fetch all the players that play chess
    const players = await db
      .collection("Players")
      .find({
        isTeam: false,
        Type: "Chess",
      })
      .toArray();

    // Fetch all the matches that are completed and are of type chess
    const matches = await db
      .collection("Matches")
      .find({
        $and: [
          { "metadata.type": "chess" },
          { "Status": "Completed" },
        ],
      })
      .toArray();

    // Process player results
    const playerResults = players.map((player) => {
      const playerMatches = matches.filter((match) =>
        match.PlayersId.some((playerId) => {
          const playerIdString = playerId?.$oid || playerId; // Handle nested $oid structure
          return new ObjectId(playerIdString).toString() === player._id.toString();
        })
      );

      let wins = 0;
      let draws = 0;
      let losses = 0;
      const totalGames = playerMatches.length + 4;
      const rating = parseInt(player.rating) || 1500;

      playerMatches.forEach((match) => {
        if (!match.Result || !Array.isArray(match.Result)) {
          console.warn(`Skipping match ${match._id} due to missing or invalid Result data.`);
          return;
        }

        const playerResult = match.Result.find((result) => {
          const resultPlayerId = result.PID?.$oid.$oid || result.PID?.$oid || result.PID; // Handle nested $oid structure
          return new ObjectId(resultPlayerId).toString() === player._id.toString();
        });

        if (!playerResult) {
          console.warn(`Skipping match ${match._id} for player ${player._id} due to missing result.`);
          return;
        }

        const isDrawMatch = match.Result.every((r) => r.isWinner === false);

        if (playerResult.isWinner) {
          wins++;
        } else if (isDrawMatch) {
          draws++;
        } else {
          losses++;
        }
      });

      const points = (wins + (draws * 0.5) + player.Score) || 0;
      const winPercentage = totalGames > 0 ? ((points / totalGames) * 100).toFixed(1) : 0;

      return {
        _id: player._id,
        UniID: player.UniID,
        Name: player.Name,
        gender: player.gender,
        played: totalGames,
        // won: wins,
        won: Math.floor(((points * winPercentage)/100)) + wins,
        drawn: (totalGames - (Math.floor(((points * winPercentage)/100)) + wins + Math.floor(((totalGames - (points * winPercentage)/100))) + losses)) + draws,
        // drawn: draws,
        lost: Math.floor(((totalGames - (points * winPercentage)/100))) + losses,
        // lost: losses,
        points: points,
        winPercentage: parseFloat(winPercentage),
      };
    });

    // Sort results by rating, points, and win percentage
    const sortedResults = playerResults
      .filter((result) => result) // Filter out invalid results
      .sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        if (b.points !== a.points) {
          return b.points - a.points;
        }
        return b.winPercentage - a.winPercentage;
      });

    return NextResponse.json(sortedResults);
  } catch (error) {
    console.error("Error fetching chess players:", error);
    return NextResponse.json(
      {
        message: "Error fetching chess players",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}