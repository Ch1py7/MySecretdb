import { InjectionMode, asClass, asFunction, createContainer } from 'awilix'
import { SaveSecret } from 'application/save_secret'
import { DbHandler } from 'infrastructure/persistance/mongo/db-handler'
import { MongoSecretRepository } from 'infrastructure/persistance/mongo/mongo-secret-repository'
import { secretParser } from './infrastructure/persistance/mongo/secret-document-parser'

const container = createContainer<Dependencies>({
  injectionMode: InjectionMode.PROXY,
})

container.register({
  dbHandler: asFunction(DbHandler),
  saveSecret: asClass(SaveSecret),
  secretRepository: asClass(MongoSecretRepository),
  secretDocumentParser: asFunction(secretParser)
})

export default container
