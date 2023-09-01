import { SaveSecret } from 'application/save_secret'
import { MongoSecretRepository } from 'infrastructure/persistance/mongo/mongo-secret-repository'
import { DbHandler } from 'infrastructure/types/database'
import { SecretEntity } from 'domain/types/Secret'
import { SecretDocumentParser } from 'infrastructure/types/document-parser'

declare global {
  interface Dependencies {
    saveSecret: SaveSecret
    secretRepository: MongoSecretRepository
    dbHandler: DbHandler
    secret: SecretEntity
    secretDocumentParser: SecretDocumentParser
  }
}