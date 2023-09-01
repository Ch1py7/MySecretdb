import { Secret } from 'domain/secret/Secret'

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
}
