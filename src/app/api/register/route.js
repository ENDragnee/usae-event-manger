import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db'; // Adjust the import path based on your folder structure.

export async function POST(req) {
  try {
    const data = await req.json();

    // Destructure the input fields from the request body
    const { fullName, university, responsibility, honor, gender, id } = data;

    // Validation
    if (!fullName || !university || !responsibility || !gender || !id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db("usae-sport"); // Default database
    const playersCollection = db.collection('Players');

    // Determine player properties based on responsibility
    const isAthletics = ["100m", "200m", "400m", "4X100m", "4X400m", "1500m", "3000m"].includes(responsibility);

    const newPlayer = {
      UniID: `${Date.now()}`, // Generate a unique ID based on the current timestamp
      Name: fullName,
      isTeam: responsibility === 'Football',
      Type: isAthletics ? 'Athletics' : 'Other',
      Status: 'Pending', // Default status
      distance: isAthletics ? responsibility : null,
      gender: gender,
      university: university,
      ID: id,
    };

    // Insert the new player into the Players collection
    const result = await playersCollection.insertOne(newPlayer);

    if (!result.acknowledged) {
      throw new Error('Failed to insert the player');
    }

    return NextResponse.json(
      { message: 'Player successfully created', player: newPlayer },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating player:', error);
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 }
    );
  }
}
