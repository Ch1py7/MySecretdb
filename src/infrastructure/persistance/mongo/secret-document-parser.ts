import { Secret } from 'domain/secret/Secret'
import { SecretDocumentParser } from 'infrastructure/types/document-parser'

export const secretParser = (from: Dependencies['from']): SecretDocumentParser => {
  return {
    toDomain: ({ _id, age, anonName, gender, likes, secret }) => {
      const id = _id.toString()
      return new Secret({
        id,
        age,
        anonName,
        gender,
        likes,
        secret
      })
    },
    toDocument: ({ id, age, anonName, gender, likes, secret }) => {
      const _id = from(id)
      return {
        _id,
        age,
        anonName,
        gender,
        likes,
        secret,
      }
    }
  }
}
