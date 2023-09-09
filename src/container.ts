import { InjectionMode, asClass, createContainer, asValue } from 'awilix'
import { SaveSecret } from 'application/save_secret'
import { DbHandler } from 'infrastructure/persistance/mongo/db-handler'
import { SecretRepository } from 'infrastructure/persistance/mongo/mongo-secret-repository'
import { SecretParser } from 'infrastructure/persistance/mongo/secret-document-parser'
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
  dbHandler: asValue(DbHandler),
  secretParser: asClass(SecretParser),
  saveSecret: asClass(SaveSecret),
  secretRepository: asClass(SecretRepository),
  updateLike: asClass(UpdateLike),
  mongodb: asValue(mongodb),
  getSecrets: asClass(GetSecrets),
  idGenerator: asClass(IdGenerator),
  crypto: asValue(crypto),
  uuid: asValue(uuid)
})

export default container
