import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const { matchId, results, gender, distance } = await request.json();

  if (!matchId || !results) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("usae-sport");

  try {
    console.log("Results received:", results);

    // Build the filter query
    const buildFilterQuery = (playerId) => {
      const query = { _id: playerId };
      
      if (gender) {
        query.gender = gender;
      }
      
      if (distance) {
        query.distance = distance;
      }
      
      return query;
    };

    const bulkUpdates = results.map((result) => {
      // Extract the PID from the result object
      const pid = result.PID?.['$oid'];

      // Validate PID format
      if (!pid || !ObjectId.isValid(pid)) {
        throw new Error(`Invalid PID format: ${pid}`);
      }

      const playerId = new ObjectId(pid);
      const filterQuery = buildFilterQuery(playerId);

      return db.collection("Players").updateOne(
        filterQuery,
        { $set: { Status: result.status } }
      );
    });

    const updateResults = await Promise.all(bulkUpdates);

    // Check if any documents were modified
    const totalModified = updateResults.reduce((sum, result) => sum + result.modifiedCount, 0);

    if (totalModified === 0) {
      return NextResponse.json({ 
        success: false,
        message: "No matching players found with the specified criteria"
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      modifiedCount: totalModified
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ 
      error: "Database update failed", 
      details: error.message 
    }, { status: 500 });
  }
}