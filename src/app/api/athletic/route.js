import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("usae-sport");
    
    const matches = await db.collection("Matches")
      .find({
        "metadata.type": "athletics",
        Status: "Completed",
      })
      .sort({ "metadata.date": -1 })
      .toArray();
    
    const enrichedMatches = await Promise.all(
      matches.map(async (match) => {
        const players = await db.collection("Players").find({
          _id: { $in: match.PlayersId.map((id) => new ObjectId(id)) },
        }).toArray();

        const enrichedResults = match.Result.map((result) => {
          const player = players.find((p) => p._id.toString() === result.PID.$oid.toString());
          return {
            ...result,
            playerName: player ? player.Name : "Unknown Player",
            Status: player.Status,
          };
        });

        return {
          ...match,
          enrichedResults,
        };
      }),
    );

    return NextResponse.json(enrichedMatches);
  } catch (error) {
    console.error("Error fetching athletics data:", error);
    return NextResponse.json(
      {
        message: "Error fetching athletics data",
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}