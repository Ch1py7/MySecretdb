import { Db, MongoClient as mongo } from 'mongodb'
import { config } from 'infrastructure/config'

const { dbName, mongoConnectionUri, mongoTimeout } = config.run.mongo

let db: Db | null
let client: mongo | null
let instance: Db | null

const _connect = async (): Promise<Db> => {
  try {
    client = await mongo.connect(mongoConnectionUri!, {
      connectTimeoutMS: mongoTimeout,
    })

    db = client.db(dbName)
    return db
  } catch (error: unknown | undefined) {
    console.error(`Error connecting to the database: ${error}`)
    throw error
  }
}

export const DbHandler = (() => {
  const createInstance = async () => {
    const db = await _connect()
    
    return db
  }

  return {
    getInstance: async () => {
      if (!instance) {
        instance = await createInstance()
      }
      return instance
    },
    disconnect: () => {
      if (client) {
        client.close()
      }
      db = null
      instance = null
      client = null
    }
  }
})
