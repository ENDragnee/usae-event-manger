import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Add this to your environment variables
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve the value across hot-reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, use a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;