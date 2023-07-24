import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import secrets from './secrets'
import insertSecrets from './insertSecrets'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('json spaces', 3)

app.get('/api/health', (_, res) => {
  res.send({ status: 'ok' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

app.use('/api/secrets', secrets)
app.use('/api/insert', insertSecrets)

export default app
