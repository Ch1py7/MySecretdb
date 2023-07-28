import express, { Router } from 'express'
import { client } from './client'

const getSecrets = async (req: express.Request, res: express.Response) => {
  const { page, pageSize, tagFilter, ageFilter } = req.query

  const pageNumber = parseInt(page as string, 10) || 1
  const limit = parseInt(pageSize as string, 10) || 10
  const skip = (pageNumber - 1) * limit

  if (pageNumber < 1 || limit < 1) {
    return res.status(400).send({ error: 'Invalid pagination parameters' })
  }
  
  try {
    await client.connect()
    const database = client.db('my_secrets')
    const collection = database.collection('secrets')

    const findResult = await collection
      .aggregate([
        { $sort: { _id: -1 } },
        { $skip: skip },
        { $limit: limit },
        tagFilter ? { $match: { tags: tagFilter} } : { $match: {} },
        ageFilter ? { $match: { age: ageFilter} } : { $match: {} },
      ])
      .toArray()

    console.log(findResult)
    res.send(findResult)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    res.status(500).send({ error: error.message })
  }
}

const router = Router()

router.get('/', getSecrets)

export default router
