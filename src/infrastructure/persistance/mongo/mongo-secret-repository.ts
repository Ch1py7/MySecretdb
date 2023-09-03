import { Secret } from 'domain/secret/Secret'
import { UpdateLike } from 'infrastructure/types/secret-repository'

const SECRETS = 'secrets'

export class MongoSecretRepository {
  private _dbHandler: Dependencies['dbHandler']
  private _secretDocumentParser: Dependencies['secretDocumentParser']

  constructor({ dbHandler, secretDocumentParser }: Pick<Dependencies, 'dbHandler' | 'secretDocumentParser'>) {
    this._dbHandler = dbHandler
    this._secretDocumentParser = secretDocumentParser
  }

  async save(secret: Secret) {
    const db = await this._dbHandler.getInstance()
    try {
      const secretDomain = this._secretDocumentParser.toDocument(secret)

      await db.collection(SECRETS).insertOne(secretDomain)

      return Promise.resolve()
    } catch (error: unknown | undefined) {
      console.error(error)
    }
  }

  async updateLike({ _id ,updateLike }: UpdateLike) {
    const db = await this._dbHandler.getInstance()
    try {
      await db.collection(SECRETS).updateOne({ _id }, updateLike)

    } catch (error: unknown | undefined) {
      console.error(error)
    }
  }
}
