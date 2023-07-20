import 'dotenv/config'
import express from 'express'
import { MongoClient } from 'mongodb'

const app = express()

app.use(express.json())

const client = new MongoClient(process.env.MONGO_URI!, {
  serverApi: {
    version: '1',
    deprecationErrors: true,
    strict: true,
  },
})

// const documentToInsert = {
//   name: 'jesucristo',
//   age: 30,
//   city: 'jerusalem',
//   tags: ['holy', 'god', 'son'],
//   dislikes: 24,
//   likes: 132,
// }

async function run() {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    const database = client.db('my_secrets')
    const collection = database.collection('secrets')

    const findResult = await collection.find({}).toArray()
    
    app.get('/api/secrets', (req, res) => {
      res.send(findResult)
    })
  } finally {
    await client.close()
  }
}

run().catch(console.dir)
