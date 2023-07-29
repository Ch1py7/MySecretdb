import express, { Router } from 'express'
import { closeDatabaseConnection, connectToDatabase } from './client'

const getAllSecrets = async (req: express.Request, res: express.Response) => {
  let client
  try {
    client = await connectToDatabase()
    const collection = client.collection('secrets')

    const findResult = await collection.find().toArray()

    res.send(findResult)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown | undefined) {
    console.error(error)
    res.status(500).send({ error: 'An error occurred while processing your request.' })
  } finally {
    if (client) await closeDatabaseConnection()
  }
}

const router = Router()

router.get('/', getAllSecrets)

export default router
