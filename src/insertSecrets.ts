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

    const { age, gender, secret, likes, anonName } = req.body
    const dataToInsert = new Secret({ age, gender, secret, likes, anonName })

    client = await connectToDatabase()
    const collection = client.collection('secrets')
    await collection.insertOne({
      age: dataToInsert.age,
      gender: dataToInsert.gender,
      secret: dataToInsert.secret,
      likes: dataToInsert.likes,
      anonName: dataToInsert.anonName,
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

router.post('/',
  [
    body('age')
      .isInt({ min: 12, max: 99 })
      .withMessage('Age must be between 12 and 99'),
    body('gender')
      .isIn(['man', 'woman', 'other'])
      .withMessage('Invalid gender'),
    body('secret')
      .isString()
      .isLength({ max: 420 })
      .matches(/^[a-zA-Z0-9\s!¡?¿,.:'"¡"'.\s]+$/)
      .withMessage('Invalid secret'),
    body('likes')
      .custom((value) => value === 0 && typeof value === 'number')
      .withMessage('Invalid likes'),
    body('anonName')
      .isString()
      .isLength({ max: 10 })
      .withMessage('Invalid anonName'),
  ],
  insertSecrets)

export default router
