import { GetSecrets, UpdateLike } from 'infrastructure/types/secret-repository'

const SECRETS = 'secrets'

export class SecretRepository {
  dbHandler: Dependencies['dbHandler']
  secretParser: Dependencies['secretParser']
  uuid: Dependencies['uuid']

  constructor({ dbHandler, secretParser, uuid }: Pick<Dependencies, 'dbHandler' | 'secretParser' | 'uuid'>) {
    this.dbHandler = dbHandler
    this.secretParser = secretParser
    this.uuid = uuid
  }

  async save({ id, age, anonName, gender, likes, secret, createdAt }: Dependencies['secret']) {
    const db = await this.dbHandler().getInstance()
    try {
      const secretDomain = { id, age, anonName, gender, likes, secret, createdAt }
      const secretDocument = this.secretParser.toDocument(secretDomain)

      await db.collection<Dependencies['documentParser']>(SECRETS).insertOne(secretDocument)

      return Promise.resolve()
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }

  async updateLike({ id , likes, isLike }: UpdateLike) {
    const db = await this.dbHandler().getInstance()
    try {
      const _id = this.uuid.from(id)
      const updateLike = isLike ? likes + 1 : likes

      await db.collection(SECRETS).updateOne({ _id }, {
        $set: {
          likes: updateLike
        }
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }

  async getSecrets({ pageNumber, limit }: GetSecrets) {
    const db = await this.dbHandler().getInstance()
    
    try {
      const skip = (pageNumber - 1) * limit
      const secretsData = await db.collection(SECRETS).find().sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()
      
      return secretsData
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }
}
