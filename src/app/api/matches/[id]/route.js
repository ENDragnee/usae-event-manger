import clientPromise from "@/lib/db"
import { ObjectId } from "mongodb"
import { NextResponse } from 'next/server'

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const updateData = await request.json()

    const client = await clientPromise
    const db = client.db("usae-sport")

    const result = await db.collection("Matches").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update match:', error)
    return NextResponse.json(
      { error: 'Failed to update match' },
      { status: 500 }
    )
  }
}