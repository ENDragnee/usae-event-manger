import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request, context) {
  try {
    const { params } = await context;
    const round = parseInt(await params.round);

    const client = await clientPromise;
    const db = client.db("usae-sport");

    // Get matches for the specific round
    const matches = await db
      .collection("Matches")
      .find({
        "metadata.phase": "tournament",
        "metadata.round": round,
      })
      .toArray();

    // Extract player IDs and convert them to ObjectId format
    const playerIds = matches.flatMap((match) =>
      match.PlayersId.map((id) => {
        try {
          return new ObjectId(id.$oid || id);
        } catch {
          return null;
        }
      }).filter(Boolean)
    );

    // Fetch player names with converted ObjectIds
    const players = await db
      .collection("Players")
      .find({
        _id: { $in: playerIds }
      })
      .toArray();

    // Create a map of player IDs to names
    const playerMap = new Map(
      players.map((player) => [
        player._id.toString(), // Convert ObjectId to string for comparison
        player.Name
      ])
    );

    // Format the response with player names
    const formattedMatches = matches.map((match) => ({
      id: match._id,
      players: match.PlayersId.map((playerId) => {
        const id = playerId.$oid || playerId;
        const stringId = typeof id === 'string' ? id : id.toString();
        return {
          id: stringId,
          name: playerMap.get(stringId) || "Unknown Team",
        };
      }),
      status: match.Status,
      result: match.Result,
      metadata: match.metadata,
    }));

    return NextResponse.json(formattedMatches);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tournament matches" },
      { status: 500 }
    );
  }
}