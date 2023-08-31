import { Secret } from 'domain/secret/Secret'
import { SaveSecretCommand } from './save-secret-command'
import { SaveSecretResponse } from './save-secret-response'

export class SaveSecret {
  secretRepository: Dependencies['secretRepository']

  constructor({ secretRepository }: Pick<Dependencies, 'secretRepository'>) {
    this.secretRepository = secretRepository
  }

  async execute(secret: SaveSecretCommand) {
    const secretDomain = new Secret(secret)
    await this.secretRepository.save(secretDomain)
    return new SaveSecretResponse(secretDomain)
  }
}
