import { SecretEntity } from 'src/domain/types/Secret'
import { MUUID } from 'uuid-mongodb'

export type SecretDocumentParser = SecretParser

export interface SecretParser {
  toDomain: (document: DocumentParser) => SecretEntity
	toDocument: (entity: SecretEntity) => DocumentParser
}

export interface DocumentParser {
  _id: MUUID
  age: number
  gender: 'man' | 'woman' | 'other'
  secret: string
  anonName: string
  likes: number
  createdAt: number
}
