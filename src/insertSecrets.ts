import express, { Router } from 'express'
import { client } from './client'

const insertSecrets = async (req: express.Request, res: express.Response) => {
  try {
    const { age, tags, gender, secret, likes, dislikes } = req.body
    const dataToInsert = { age, tags, gender, secret, likes, dislikes }

    await client.connect()
    const database = client.db('my_secrets')
    const collection = database.collection('secrets')
    await collection.insertOne(dataToInsert)

    res.sendStatus(201)
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    res.status(500).send({ error: error.message })
  }
}

const router = Router()

router.post('/', insertSecrets)

export default router
