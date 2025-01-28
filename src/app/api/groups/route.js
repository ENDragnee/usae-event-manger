import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("usae-sport");

    const teams = await db
      .collection("Players")
      .find({ 
        Group: { $exists: true },
        isTeam: true,
        Type: "Football"
      })
      .toArray();

    const matches = await db
      .collection("Matches")
      .find({
        $and: [
          { "metadata.type": "soccer" },
          { Status: "Completed" }
        ],
      })
      .toArray();

    const teamResults = teams.map((team) => {
      const teamMatches = matches.filter(match => {
        return match.PlayersId.some(playerId => 
          new ObjectId(playerId).toString() === team._id.toString()
        );
      });

      let wins = 0;
      let draws = 0;
      let losses = 0;
      let goalsFor = 0;
      let goalsAgainst = 0;

      teamMatches.forEach((match) => {
        if (!match.Result || !Array.isArray(match.Result)) {
          console.warn(`Skipping match ${match._id} due to missing or invalid Result data.`);
          return;
        }
      
        // Extract the actual ObjectId from the nested structure
        const teamResult = match.Result.find(r => {
          const pid = r.PID.$oid.$oid || r.PID.$oid || r.PID;
          return new ObjectId(pid).toString() === team._id.toString();
        });
        
        const opponentResult = match.Result.find(r => {
          const pid = r.PID.$oid.$oid || r.PID.$oid || r.PID;
          return new ObjectId(pid).toString() !== team._id.toString();
        });
      
        if (!teamResult || !opponentResult) {
          console.warn(`Skipping match ${match._id} for team ${team._id} due to missing result.`);
          return;
        }
      
        const teamScore = parseInt(teamResult.score || 0, 10);
        const opponentScore = parseInt(opponentResult.score || 0, 10);
      
        goalsFor += teamScore;
        goalsAgainst += opponentScore;
            
        if (teamScore > opponentScore) wins++;
        else if (teamScore < opponentScore) losses++;
        else draws++;
      });
      
      const points = (wins * 3) + draws;
      return {
        _id: team._id,
        UniID: team.UniID,
        Name: team.Name,
        Group: team.Group,
        played: teamMatches.length,
        won: wins,
        drawn: draws,
        lost: losses,
        gd: goalsFor - goalsAgainst,
        points: points,
        goalsFor:goalsFor,
        goalsAgainst: goalsAgainst
      };
    });

    const sortedResults = teamResults
      .filter(result => result)
      .sort((a, b) => {
        if (a.Group !== b.Group) {
          return a.Group.localeCompare(b.Group);
        }
        if (b.points !== a.points) {
          return b.points - a.points;
        }
        if (b.gd !== a.gd) {
          return b.gd - a.gd;
        }
        return b.goalsFor - a.goalsFor;
      });

    return NextResponse.json(sortedResults);
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