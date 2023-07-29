import express, { Router } from 'express'
import { ObjectId } from 'mongodb'
import { closeDatabaseConnection, connectToDatabase } from './client'

const updateLikes = async (req: express.Request, res: express.Response) => {
  let client
  try {
    const { id, likes, isLike } = req.body
    const _id = new ObjectId(id)
    const updateLikes = { $set: { likes: isLike ? likes + 1 : likes } }

    client = await connectToDatabase()
    const collection = client.collection('secrets')

    await collection.updateOne({ _id }, updateLikes)

    res.sendStatus(201)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown | undefined) {
    console.error(error)
    res.status(500).send({ error: 'An error occurred while processing your request.' })
  } finally {
    if (client) await closeDatabaseConnection()
  }
}

const router = Router()

router.post('/', updateLikes)

export default router
