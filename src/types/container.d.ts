import { SaveSecret } from 'application/save_secret'
import { MongoSecretRepository } from 'infrastructure/persistance/mongo/mongo-secret-repository'
import { DbHandler } from 'infrastructure/types/database'
import { Secret } from 'domain/secret/Secret'
import { SecretDocumentParser } from 'infrastructure/types/document-parser'
import { UpdateLike } from 'application/update_likes'
import * as mongodb from 'mongodb'

declare global {
  interface Dependencies {
    saveSecret: SaveSecret
    secretRepository: MongoSecretRepository
    dbHandler: DbHandler
    secret: Secret
    secretDocumentParser: SecretDocumentParser
    updateLike: UpdateLike
    mongodb: typeof mongodb
  }
}