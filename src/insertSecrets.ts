import express, { Router } from 'express'
import { client } from './client'

const insertSecrets = async (req: express.Request, res: express.Response) => {
  try {
    const { age, tags, gender, secret, likes, dislikes } = req.body
    const dataToInsert = { age: age, tags: tags, gender: gender, secret: secret, likes: likes, dislikes: dislikes }

    await client.connect()
    const database = client.db('my_secrets')
    const collection = database.collection('secrets')
    await collection.insertOne(dataToInsert)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    res.status(500).send({ error: error.message })
  }
}

const router = Router()

router.post('/', insertSecrets)

export default router
