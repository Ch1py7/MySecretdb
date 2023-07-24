import express, { Router } from 'express'
import { client } from './client'

const insertSecrets = async (req: express.Request, res: express.Response) => {
  try {
    const { age, tags, gender, secret } = req.body
    const dataToInsert = { age: age, tags: tags, gender: gender, secret: secret }

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

router.post('/', insertSecrets)

export default router
