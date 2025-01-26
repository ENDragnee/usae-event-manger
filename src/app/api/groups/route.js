import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("usae-sport");

    // Fetch all teams
    const teams = await db
      .collection("Players")
      .find({ Group: { $exists: true } })
      .toArray();

    // Fetch all completed soccer matches
    const matches = await db
      .collection("Matches")
      .find({
        $and: [{ "metadata.type": "soccer" }, { Status: "Completed" }],
      })
      .toArray();

    // Calculate statistics for each team
    const teamResults = teams.map((team) => {
      // Get all matches where this team participated
      const teamMatches = matches.filter((match) =>
        match.PlayersId.map((id) => id.toString()).includes(team._id.toString())
      );

      let wins = 0;
      let draws = 0;
      let losses = 0;
      let goalsFor = 0;
      let goalsAgainst = 0;

      teamMatches.forEach((match) => {
        // Find this team's result in the match
        const teamResult = match.Result.find(
          (r) => r.PID.toString() === team._id.toString()
        );

        // Find opponent's result
        const opponentResult = match.Result.find(
          (r) => r.PID.toString() !== team._id.toString()
        );

        if (teamResult && opponentResult) {
          // Convert scores to numbers
          const teamScore = parseInt(teamResult.score);
          const opponentScore = parseInt(opponentResult.score);

          // Update goals
          goalsFor += teamScore;
          goalsAgainst += opponentScore;

          // Determine match outcome based on scores
          if (teamScore > opponentScore) {
            wins++;
          } else if (teamScore < opponentScore) {
            losses++;
          } else {
            draws++;
          }
        }
      });

      return {
        ...team,
        played: teamMatches.length,
        won: wins,
        drawn: draws,
        lost: losses,
        gd: goalsFor - goalsAgainst,
        points: wins * 3 + draws,
      };
    });

    return NextResponse.json(teamResults);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      {
        message: "Error fetching teams",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
