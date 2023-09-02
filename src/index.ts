import 'module-alias/register'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import { router as secretRoutes } from './infrastructure/http/secret-controller'

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/secret', secretRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

export default app
