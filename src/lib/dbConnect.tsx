
import { MongoClient, Db, ServerApiVersion } from "mongodb";

let cachedClient: MongoClient | null = null;

async function dbConnect(): Promise<Db> {
  if (!cachedClient) {
    cachedClient = new MongoClient(process.env.MONGODB_URI as string, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await cachedClient.connect();
    console.log("Connected to MongoDB");
  }
console.log(process.env.DB_NAME, "this is url")
  return cachedClient.db(process.env.DB_NAME as string);
}

export default dbConnect;
