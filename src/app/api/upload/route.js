import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import * as XLSX from 'xlsx'; // Corrected import
import clientPromise from '@/lib/db';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Read Excel file
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Process data
    const updates = [];
    for (let i = 3; i < data.length; i++) { // Skip headers
      const row = data[i];
      if (row.length < 7) continue;

      // Process White player
      if (row[2] && row[3] !== undefined) {
        updates.push({
          name: row[2].trim(),
          score: convertFraction(row[3])
        });
      }

      // Process Black player
      if (row[5] && row[6] !== undefined) {
        updates.push({
          name: row[6].trim(),
          score: convertFraction(row[5])
        });
      }
    }

    // Update MongoDB
    const client = await clientPromise;
    const db = client.db("usae-sport");
    const bulkOps = updates.map(update => ({
      updateOne: {
        filter: { Name: update.name },
        update: { $set: { Score: update.score } }
      }
    }));

    const result = await db.collection('Players').bulkWrite(bulkOps);
    return NextResponse.json({
      updatedCount: result.modifiedCount,
      matchedCount: result.matchedCount
    });

  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process file' },
      { status: 500 }
    );
  }
}

// Convert fraction strings to numbers
function convertFraction(score) {
  if (typeof score === 'number') return score;
  if (score.includes('½')) return parseFloat(score.replace('½', '.5'));
  return parseFloat(score);
}