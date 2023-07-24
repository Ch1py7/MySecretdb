import { MongoClient } from 'mongodb'

export const client = new MongoClient(process.env.MONGO_URI!, {
  serverApi: {
    version: '1',
    deprecationErrors: true,
    strict: true,
  },
})
