import express, { Router } from 'express'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URI!, {
  serverApi: {
    version: '1',
    deprecationErrors: true,
    strict: true,
  },
})

const getSecrets = async (req: express.Request, res: express.Response) => {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    const database = client.db('my_secrets')
    const collection = database.collection('secrets')

    const findResult = await collection.find({}).toArray()

    res.send(findResult)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    res.status(500).send({ error: error.message })
  }
}

const router = Router()

router.get('/', getSecrets)

export default router
