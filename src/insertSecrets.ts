import express, { Router } from 'express'
import { client } from './client'
import { ObjectId } from 'mongodb'

const id = new ObjectId()

const insertSecrets = async (req: express.Request, res: express.Response) => {
  try {
    const { name, age, tags, gender, secret } = req.query

    const dataToInsert = { name: name, age: age, tags: tags, gender: gender, secret: secret, id: id }

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
