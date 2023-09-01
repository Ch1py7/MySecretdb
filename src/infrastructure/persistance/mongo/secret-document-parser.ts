import { Secret } from 'domain/secret/Secret'
import { SecretDocumentParser } from 'infrastructure/types/document-parser'

export const secretParser = (): SecretDocumentParser => {
  return {
    toDomain: ({age, anonName, gender, likes, secret}) => {
      return new Secret({
        age,
        anonName,
        gender,
        likes,
        secret
      })
    },
    toDocument: ({ age, anonName, gender, likes, secret }) => {
      return {
        age,
        anonName,
        gender,
        likes,
        secret,
      }
    }
  }
}