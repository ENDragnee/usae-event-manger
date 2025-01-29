import { NextResponse } from 'next/server';
import clientPromise from "@/lib/db";
import { ObjectId } from 'mongodb';

export async function POST(request) {
    try {
        const { status } = await request.json();
        const client = await clientPromise;
        const db = client.db("usae-sport");
        
        // Get players with specified status and type Football
        const players = await db.collection("Players")
        .find({
            Status: status,
            Type: "Football"
        })
        .sort({ Group: 1 }) // Sort by Group in ascending order
        .toArray();
    

        // Check if we have even number of players
        if(players.length % 2 !== 0) {
            return NextResponse.json(
                { message: "Need even number of players for elimination matches" },
                { status: 400 }
            );
        }

        const matches = [];
        
        // Create matches pairing players [0,1], [2,3], etc
        for(let i = 0; i < players.length; i += 2) {
            const match = {
                PlayersId: [
                    players[i]._id,
                    players[i+1]._id
                ],
                Result: [
                    {
                        PID: players[i]._id,
                        score: "",
                        isWinner: false
                    },
                    {
                        PID: players[i+1]._id,
                        score: "",
                        isWinner: false
                    }
                ],
                Status: "Pending",
                metadata: {
                    type: "soccer",
                    date: new Date().toISOString().split('T')[0],
                    startTime: "8:00 AM", 
                    endTime: "9:00 AM",
                    phase: "tournament"
                }
            };
            
            matches.push(match);
        }

        // Insert all matches
        const result = await db.collection("Matches").insertMany(matches);

        return NextResponse.json({
            message: "Elimination matches created successfully",
            matches: result
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { message: "Error creating matches", error: error.message },
            { status: 500 }
        );
    }
}