// /src/app/api/searchPlayer/route.ts
import { NextResponse } from "next/server"
import clientPromise from '@/lib/db';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const { playerId } = await req.json()
    if (!playerId) {
      return NextResponse.json({ error: "Player ID is required" }, { status: 400 })
    }

    const db = client.db("usae-sport");
    const player = await db.collection("Players").findOne({ playerList: playerId })

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    return NextResponse.json({ playerId: player._id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
