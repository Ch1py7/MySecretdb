import express, { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { closeDatabaseConnection, connectToDatabase } from './client'
import { Secret } from './domain/secret/Secret'

const insertSecrets = async (req: express.Request, res: express.Response) => {
  let client
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { age, tags, gender, secret, likes, dislikes } = req.body
    const dataToInsert = new Secret({ age, tags, gender, secret, likes, dislikes })

    client = await connectToDatabase()
    const collection = client.collection('secrets')
    await collection.insertOne({
      age: dataToInsert.age,
      tags: dataToInsert.tags,
      gender: dataToInsert.gender,
      secret: dataToInsert.secret,
      likes: dataToInsert.likes,
      dislikes: dataToInsert.dislikes,
    })

    res.sendStatus(201)
    
  } catch (error: unknown | undefined) {
    console.error(error)
    res.status(500).send({ error: 'An error occurred while processing your request.' })
  } finally {
    if (client) await closeDatabaseConnection()
  }
}

const router = Router()

const validateTags = (value: string) => {
  const tagsRegex = /^(?:[a-zA-Z0-9]{1,7}(?:,|$)){0,3}$/
  if (!tagsRegex.test(value)) {
    throw new Error('Invalid tags')
  }
  return true
}

router.post('/',
  [
    body('age')
      .isInt({ min: 12, max: 99 })
      .withMessage('Age must be between 12 and 99'),
    body('tags')
      .custom(validateTags),
    body('gender')
      .isIn(['man', 'woman'])
      .withMessage('Invalid gender'),
    body('secret')
      .isString()
      .isLength({ max: 420 })
      .matches(/^[a-zA-Z0-9\s]+$/)
      .withMessage('Invalid secret'),
    body('likes')
      .custom((value) => value === 0 && typeof value === 'number')
      .withMessage('Invalid likes'),
    body('dislikes')
      .custom((value) => value === 0 && typeof value === 'number')
      .withMessage('Invalid dislikes'),
  ],
  insertSecrets)

export default router
