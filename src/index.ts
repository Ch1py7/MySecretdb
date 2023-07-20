import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import secrets from './secrets'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_, res) => {
  res.send({ status: 'ok' })
})

app.use('/api/secrets', secrets)

export default app
