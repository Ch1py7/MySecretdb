import { InjectionMode, asClass, asFunction, createContainer, asValue } from 'awilix'
import { SaveSecret } from 'application/save_secret'
import { DbHandler } from 'infrastructure/persistance/mongo/db-handler'
import { MongoSecretRepository } from 'infrastructure/persistance/mongo/mongo-secret-repository'
import { secretParser } from 'infrastructure/persistance/mongo/secret-document-parser'
import { UpdateLike } from 'application/update_likes'
import * as mongodb from 'mongodb'
import { GetSecrets } from 'application/get_secrets'
import { IdGenerator } from 'domain/secret/services/id-generator'
import * as crypto from 'crypto'
import * as uuid from 'uuid-mongodb'

const container = createContainer<Dependencies>({
  injectionMode: InjectionMode.PROXY,
})

container.register({
  dbHandler: asFunction(DbHandler),
  secretDocumentParser: asFunction(secretParser),
  saveSecret: asClass(SaveSecret),
  secretRepository: asClass(MongoSecretRepository),
  updateLike: asClass(UpdateLike),
  mongodb: asValue(mongodb),
  getSecrets: asClass(GetSecrets),
  idGenerator: asClass(IdGenerator),
  crypto: asValue(crypto),
  uuid: asValue(uuid)
})

export default container
