import { Secret } from 'domain/secret/Secret'
import { DocumentParser } from 'infrastructure/types/document-parser'
import { SecretEntity } from 'src/domain/types/Secret'

export class SecretParser {
  private _uuid: Dependencies['uuid']

  constructor({ uuid }: Pick<Dependencies, 'uuid'>) {
    this._uuid = uuid
  }

  toDomain({ _id, age, anonName, gender, likes, secret, createdAt }: DocumentParser) {
    const id = _id.toString()
    return new Secret({
      id,
      age,
      anonName,
      gender,
      likes,
      secret,
      createdAt
    })
  }

  toDocument({ id, age, anonName, gender, likes, secret, createdAt }: SecretEntity) {
    const _id = this._uuid.from(id)
    return {
      _id,
      age,
      anonName,
      gender,
      likes,
      secret,
      createdAt
    }
  }
}
