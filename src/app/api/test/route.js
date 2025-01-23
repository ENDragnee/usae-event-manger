import clientPromise from "@/lib/db";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("usae-sport"); // Replace with your database name

    const collection = db.collection("Players"); // Replace with your collection name
    const data = await collection.find({}).toArray();

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch data" });
  }
}
