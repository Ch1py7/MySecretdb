import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import secrets from './secrets'
import insertSecrets from './insertSecrets'
import updateLikes from './updateLikes'
import updateDislikes from './updateDislikes'
import allSecrets from './allSecrets'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_, res) => {
  res.send({ status: 'ok' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})

app.use('/api/allsecrets', allSecrets)
app.use('/api/secrets', secrets)
app.use('/api/insert', insertSecrets)
app.use('/api/updatelikes', updateLikes)
app.use('/api/updatedislikes', updateDislikes)

export default app
