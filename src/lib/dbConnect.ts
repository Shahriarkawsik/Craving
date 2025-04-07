import { MongoClient, Db, ServerApiVersion } from "mongodb";

let cachedClient: MongoClient | null = null;

async function dbConnect(): Promise<Db> {
  if (!cachedClient) {
    cachedClient = new MongoClient(
      process.env.NEXTAUTH_PUBLIC_MONGODB_URI as string,
      {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      }
    );
    await cachedClient.connect();
    // console.log("Connected to MongoDB");
  }
  return cachedClient.db(process.env.DB_NAME as string);
}

export default dbConnect;
