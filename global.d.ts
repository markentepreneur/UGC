import { MongoClient } from "mongodb";

export {};

declare global {
  // For Mongoose connection cache
  var mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  };

  // For MongoClient connection cache (NextAuth / MongoDB adapter)
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
