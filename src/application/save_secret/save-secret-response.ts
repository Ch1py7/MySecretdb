import { SaveSecretResponseConstructor } from 'application/types/save-secret-constructor'

export class SaveSecretResponse {
  id: string
  secret: string
  createdAt: number

  constructor({ id, secret, createdAt }: SaveSecretResponseConstructor) {
    this.id = id
    this.secret = secret
    this.createdAt = createdAt
  }
}
