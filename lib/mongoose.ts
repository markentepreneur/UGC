"use server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

declare global {
  var _mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const cached = global._mongoose || { conn: null, promise: null };
global._mongoose = cached;

export async function connectToDatabase() {
  try {
    //   if (cached.conn) return cached.conn;

    if (true || !cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI);
    }
    cached.conn = await cached.promise;

    return cached.conn;
  } catch (error) {
    console.error(error);
  }
}
