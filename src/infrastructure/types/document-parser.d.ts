import { SecretEntity } from 'domain/types/Secret'
import { Secret } from 'domain/secret/Secret'

export interface DocumentParser<T, U> {
  toDomain: (document: T) => U
	toDocument: (entity: U) => T
}

export type SecretDocumentParser = DocumentParser<SecretEntity, Secret>