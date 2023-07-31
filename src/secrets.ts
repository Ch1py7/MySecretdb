import express, { Router } from 'express'
import { closeDatabaseConnection, connectToDatabase } from './client'

const getSecrets = async (req: express.Request, res: express.Response) => {
  let client
  const { page, pageSize, tagFilter, ageFilter } = req.query

  const pageNumber = parseInt(page as string, 10) || 1
  const limit = parseInt(pageSize as string, 10) || 10
  const skip = (pageNumber - 1) * limit

  if (pageNumber < 1 || limit < 1) {
    return res.status(400).send({ error: 'Invalid pagination parameters' })
  }
  
  try {
    client = await connectToDatabase()
    const collection = client.collection('secrets')

    const findResult = await collection
      .aggregate([
        { $sort: { _id: -1 } },
        { $skip: skip },
        { $limit: limit },
        tagFilter ? { $match: { tags: tagFilter} } : { $match: {} },
        ageFilter ? { $match: { age: Number(ageFilter) } } : { $match: {} },
      ])
      .toArray()

    console.log(findResult)
    res.send(findResult)
    
  } catch (error: unknown | undefined) {
    console.error(error)
    res.status(500).send({ error: 'An error occurred while processing your request.' })
  } finally {
    if (client) await closeDatabaseConnection()
  }
}

const router = Router()

router.get('/', getSecrets)

export default router
