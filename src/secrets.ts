import express, { Router } from 'express'

const getSecrets = async (req: express.Request, res: express.Response) => {
  try {
    const url = process.env.MONGO_URI!

    const response = await fetch(url)
    const data = await response.json()

    res.send(data)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error)
    res.status(500).send({ error: error.message })
  }
}

const router = Router()

router.get('/', getSecrets)

export default router
