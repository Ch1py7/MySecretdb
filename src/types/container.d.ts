import type { GetSecrets } from 'application/get_secrets'
import type { SaveSecret } from 'application/save_secret'
import type { UpdateLike } from 'application/update_likes'

import type crypto from 'crypto'
import * as mongodb from 'mongodb'
import type uuid from 'uuid-mongodb'

import type { Secret } from 'domain/secret/Secret'

import type { SecretRepository } from 'infrastructure/persistance/mongo/mongo-secret-repository'
import type { DbHandler } from 'infrastructure/persistance/mongo/db-handler'
import type { SecretParser } from 'infrastructure/persistance/mongo/secret-document-parser'

import type { IdGenerator } from 'domain/secret/services/id-generator'
import { DocumentParser } from 'src/infrastructure/types/document-parser'
  
declare global {
  interface Dependencies {
    // Use cases
    saveSecret: SaveSecret
    getSecrets: GetSecrets
    updateLike: UpdateLike

    // Persistance
    secretParser: SecretParser
    dbHandler: typeof DbHandler
    secretRepository: SecretRepository
    documentParser: DocumentParser

    // Domain services
    secret: Secret
    idGenerator: IdGenerator

    // Libraries
    mongodb: typeof mongodb
    crypto: typeof crypto
    uuid: typeof uuid
  }
}
