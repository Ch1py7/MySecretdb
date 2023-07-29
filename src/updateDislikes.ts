import express, { Router } from 'express'
import { ObjectId } from 'mongodb'
import { closeDatabaseConnection, connectToDatabase } from './client'

const updateDislikes = async (req: express.Request, res: express.Response) => {
  let client
  try {
    const { id, dislikes, isDislike } = req.body
    const _id = new ObjectId(id)
    const updateLikes = { $set: { dislikes: isDislike ? dislikes - 1 : dislikes } }

    client = await connectToDatabase()
    const collection = client.collection('secrets')

    await collection.updateOne({ _id }, updateLikes)

    res.sendStatus(201)

  } catch (error: unknown | undefined) {
    console.error(error)
    res.status(500).send({ error: 'An error occurred while processing your request.' })
  } finally {
    if (client) await closeDatabaseConnection()
  }
}

const router = Router()

router.post('/', updateDislikes)

export default router
