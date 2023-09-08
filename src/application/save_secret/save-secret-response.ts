import { SaveSecretResponseConstructor } from 'application/types/save-secret-constructor'

export class SaveSecretResponse {
  id: string
  secret: string

  constructor({ id, secret }: SaveSecretResponseConstructor) {
    this.id = id
    this.secret = secret
  }
}
