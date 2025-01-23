import clientPromise from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("usae-sport");
    
    // Fetch matches with player details
    const matches = await db.collection("Matches")
      .aggregate([
        {
          $lookup: {
            from: "Players",
            localField: "PlayersId",
            foreignField: "_id",
            as: "players"
          }
        }
      ]).toArray();

    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch matches' }, 
      { status: 500 }
    );
  }
}