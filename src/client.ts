import { MongoClient } from 'mongodb'

const dbName = 'my_secrets'

export const client = new MongoClient(process.env.MONGO_URI!, {
  serverApi: {
    version: '1',
    deprecationErrors: true,
    strict: true,
  },
})

export async function connectToDatabase() {
  try {
    await client.connect()

    return client.db(dbName)
  } catch (error) {
    console.error('Error connecting to the database:', error)
    throw error
  }
}

export async function closeDatabaseConnection() {
  try {
    await client.close()
  } catch (error) {
    console.error('Error closing the database connection:', error)
    throw error
  }
}
