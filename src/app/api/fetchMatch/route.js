// /src/app/api/fetchMatch/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId for conversion
import clientPromise from '@/lib/db';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const { playerId } = await req.json();

    if (!playerId) {
      return NextResponse.json({ error: "Player ID is required" }, { status: 400 });
    }

    // Convert the playerId to a MongoDB ObjectId
    let playerObjectId;
    try {
      playerObjectId = new ObjectId(playerId);
    } catch (error) {
      return NextResponse.json({ error: "Invalid Player ID format" }, { status: 400 });
    }

    const db = client.db("usae-sport");

    // Query using $elemMatch for the PlayersId array
    const matches = await db.collection("Matches").find({
      PlayersId: { $elemMatch: { $eq: playerObjectId } }
    }).toArray();

    if (!matches.length) {
      return NextResponse.json({ error: "No matches found for this player" }, { status: 404 });
    }

    return NextResponse.json({ matches });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
