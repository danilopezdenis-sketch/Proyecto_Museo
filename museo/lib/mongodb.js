import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) throw new Error('Define MONGODB_URI en .env.local')

let cached = global._mongoose || { conn: null, promise: null }
global._mongoose = cached

export async function connectMongo() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(m => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}
