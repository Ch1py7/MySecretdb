import { GetSecrets } from 'application/get_secrets'
import { SaveSecret } from 'application/save_secret'
import { UpdateLike } from 'application/update_likes'
import * as crypto from 'crypto'
import { Secret } from 'domain/secret/Secret'
import { IdGenerator } from 'domain/secret/services/id-generator'
import { MongoSecretRepository } from 'infrastructure/persistance/mongo/mongo-secret-repository'
import { Collection, DbHandler } from 'infrastructure/types/database'
import { SecretDocumentParser } from 'infrastructure/types/document-parser'
import * as mongodb from 'mongodb'
import { MUUID } from 'uuid-mongodb'
import * as uuid from 'uuid-mongodb'
  
declare global {
  interface Dependencies {
    saveSecret: SaveSecret
    secretRepository: MongoSecretRepository
    dbHandler: DbHandler
    secret: Secret
    secretDocumentParser: SecretDocumentParser
    updateLike: UpdateLike
    mongodb: typeof mongodb
    getSecrets: GetSecrets
    idGenerator: IdGenerator
    crypto: typeof crypto
    collection: Collection
    uuid: typeof uuid
    muuid: MUUID
  }
}
