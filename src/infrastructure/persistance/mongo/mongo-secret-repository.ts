import { GetSecrets, UpdateLike } from 'infrastructure/types/secret-repository'

const SECRETS = 'secrets'

export class MongoSecretRepository {
  dbHandler: Dependencies['dbHandler']
  secretDocumentParser: Dependencies['secretDocumentParser']
  uuid: Dependencies['uuid']

  constructor({ dbHandler, secretDocumentParser, uuid }: Pick<Dependencies, 'dbHandler' | 'secretDocumentParser' | 'uuid'>) {
    this.dbHandler = dbHandler
    this.secretDocumentParser = secretDocumentParser
    this.uuid = uuid
  }

  async save({ id, age, anonName, gender, likes, secret }: Dependencies['secret']) {
    const db = await this.dbHandler.getInstance()
    try {
      const secretDocument = this.secretDocumentParser.toDocument({ id, age, anonName, gender, likes, secret })

      await db.collection<Dependencies['collection']>(SECRETS).insertOne(secretDocument)

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
    const db = await this.dbHandler.getInstance()
    try {
      const _id = this.uuid.from(id)
      const updateLike = isLike ? likes + 1 : likes

      await db.collection<{_id: Dependencies['muuid']}>(SECRETS).updateOne({ _id }, {
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
    const db = await this.dbHandler.getInstance()
    const skip = (pageNumber - 1) * limit

    try {
      const secretsData = await db.collection(SECRETS).aggregate<Dependencies['secret']>([
        { $sort: { _id: -1 } },
        { $skip: skip },
        { $limit: limit },
      ])
        .toArray()
      
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
