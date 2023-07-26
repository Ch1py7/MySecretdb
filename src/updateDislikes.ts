import express, { Router } from 'express'
import { ObjectId } from 'mongodb'
import { client } from './client'

const updateDislikes = async (req: express.Request, res: express.Response) => {
  try {
    const { id, dislikes, isDisike } = req.body
    const _id = new ObjectId(id)
    const updateLikes = { $set: { dislikes: isDisike ? dislikes - 1 : dislikes + 1 } }

    await client.connect()
    const database = client.db('my_secrets')
    const collection = database.collection('secrets')

    await collection.updateOne({ _id }, updateLikes)

    res.sendStatus(201)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    res.status(500).send({ error: error.message })
  }
}

const router = Router()

router.post('/', updateDislikes)

export default router