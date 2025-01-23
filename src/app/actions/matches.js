'use server'

import clientPromise from "@/lib/db";

export async function getMatches() {
  try {
    const client = await clientPromise;
    const db = client.db("usae-sport");
    
    const matches = await db.collection("Matches").aggregate([
      {
        $lookup: {
          from: "Players",
          localField: "PlayersId",
          foreignField: "_id",
          as: "players"
        }
      }
    ]).toArray();

    
    return JSON.parse(JSON.stringify(matches));
  } catch (error) {
    console.error("Failed to fetch matches:", error);
    return [];
  }
}