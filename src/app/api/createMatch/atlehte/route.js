import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("usae-sport");

    // Parse the request body
    const { distance, gender, status } = await request.json();

    if (!distance || !gender || !status) {
      return NextResponse.json(
        { success: false, message: 'Missing required parameters: distance, gender, or status' },
        { status: 400 }
      );
    }

    // Get collections
    const playersCollection = db.collection('Players');
    const matchesCollection = db.collection('Matches');

    // Fetch pending players based on filters
    const pendingPlayers = await playersCollection
      .find({
        Type: 'Athletics',
        Status: status,
        distance: distance,
        gender: gender,
      })
      .toArray();

    console.log('Pending Players:', pendingPlayers);

    if (pendingPlayers.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No pending players found for the specified criteria' },
        { status: 404 }
      );
    }

    // Group players into sets of 8
    const playerGroups = [];
    for (let i = 0; i < pendingPlayers.length; i += 8) {
      const group = pendingPlayers.slice(i, i + 8);
      if (group.length === 8) { // Only create matches for complete groups of 8
        playerGroups.push(group);
      }
    }

    const matches = [];
    for (const group of playerGroups) {
      const playerIds = group.map(player => new ObjectId(player._id));

      // Create initial empty results array
      const initialResults = group.map(player => ({
        PID: new ObjectId(player._id),
        score: "0",
      }));

      // Generate match document
      const date = new Date();
      const matchDocument = {
        PlayersId: playerIds,
        Result: initialResults,
        Status: 'Pending',
        metadata: {
          type: 'athletics',
          distance: distance,
          gender: gender,
          date: date.toISOString().split('T')[0],
          startTime: "8:00 AM",
          endTime: "9:00 AM",
        },
      };

      // Insert match document
      const result = await matchesCollection.insertOne(matchDocument);
      matches.push({ _id: result.insertedId, ...matchDocument });

      // Update player statuses to 'In Progress'
      await playersCollection.updateMany(
        { _id: { $in: playerIds } },
        { $set: { Status: 'In Progress' } }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${matches.length} matches`,
      matches: matches,
    }, { status: 201 });

  } catch (error) {
    console.error('Error generating matches:', error);
    return NextResponse.json({
      success: false,
      message: 'Error generating matches',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
}
