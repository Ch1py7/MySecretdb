import { InjectionMode, asClass, asFunction, createContainer, asValue } from 'awilix'
import { SaveSecret } from 'application/save_secret'
import { DbHandler } from 'infrastructure/persistance/mongo/db-handler'
import { MongoSecretRepository } from 'infrastructure/persistance/mongo/mongo-secret-repository'
import { secretParser } from './infrastructure/persistance/mongo/secret-document-parser'
import { UpdateLike } from './application/update_likes'
import * as mongodb from 'mongodb'

const container = createContainer<Dependencies>({
  injectionMode: InjectionMode.PROXY,
})

container.register({
  dbHandler: asFunction(DbHandler),
  secretDocumentParser: asFunction(secretParser),
  saveSecret: asClass(SaveSecret),
  secretRepository: asClass(MongoSecretRepository),
  updateLike: asClass(UpdateLike),
  mongodb: asValue(mongodb)
})

export default container
