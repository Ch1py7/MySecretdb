import express, { Router } from 'express'
import { client } from './client'

const getAllSecrets = async (req: express.Request, res: express.Response) => {
  try {
    await client.connect()
    const database = client.db('my_secrets')
    const collection = database.collection('secrets')

    const findResult = await collection.find().toArray()

    res.send(findResult)
  } catch (error: unknown | undefined) {
    console.error(error)
    res.status(500).send({ error: 'An error occurred while processing your request.' })
  }
}

const router = Router()


router.get('/', getAllSecrets)

export default router
