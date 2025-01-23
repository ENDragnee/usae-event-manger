import clientPromise from './db';

export async function getMatches() {
  try {
    const client = await clientPromise;
    const db = client.db("usae-sport");
    
    const matches = await db.collection("Matches")
      .aggregate([
        {
          $lookup: {
            from: "Players",
            let: { playerIds: { 
              $map: { 
                input: "$PlayersId", 
                as: "pid",
                in: { $toObjectId: "$$pid" }
              }
            }},
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$playerIds"]
                  }
                }
              }
            ],
            as: "players"
          }
        }
      ]).toArray();

    return JSON.parse(JSON.stringify(matches));
  } catch (error) {
    console.error('Failed to fetch matches:', error);
    throw new Error('Failed to fetch matches');
  }
}