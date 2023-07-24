import express, { Router } from 'express'
import { client } from './client'

const insertSecrets = async (req: express.Request, res: express.Response) => {
  try {
    const { name, age, tags, genre, secret } = req.query

    const dataToInsert = { name: name, age: age, tags: tags, genre: genre, secret: secret }

    await client.connect()
    const database = client.db('my_secrets')
    const collection = database.collection('secrets')
    await collection.insertOne(dataToInsert)
  } catch (error) {
    console.error(error)
    res.status(500).send({})
  }
}

const router = Router()

router.get('/', insertSecrets)

export default router
