import { Secret } from 'domain/secret/Secret'
import { UpdateLike } from 'infrastructure/types/secret-repository'
import { ObjectId } from 'mongodb'
import { SaveSecretCommand } from 'src/application/save_secret/save-secret-command'

const SECRETS = 'secrets'

export class MongoSecretRepository {
  private _dbHandler: Dependencies['dbHandler']
  private _secretDocumentParser: Dependencies['secretDocumentParser']

  constructor({ dbHandler, secretDocumentParser }: Pick<Dependencies, 'dbHandler' | 'secretDocumentParser'>) {
    this._dbHandler = dbHandler
    this._secretDocumentParser = secretDocumentParser
  }

  async save(secret: SaveSecretCommand) {
    const db = await this._dbHandler.getInstance()
    try {
      const secretDomain = new Secret(secret)
      const secretData = this._secretDocumentParser.toDocument(secretDomain)

      await db.collection(SECRETS).insertOne(secretData)

      return Promise.resolve()
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }

  async updateLike({ id ,updateLike }: UpdateLike) {
    const db = await this._dbHandler.getInstance()
    try {
      const _id = new ObjectId(id)

      await db.collection(SECRETS).updateOne({ _id }, updateLike)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error(error)
      }
    }
  }
}
