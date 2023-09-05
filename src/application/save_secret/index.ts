import { SaveSecretCommand } from './save-secret-command'
import { SaveSecretResponse } from './save-secret-response'

export class SaveSecret {
  secretRepository: Dependencies['secretRepository']

  constructor({ secretRepository }: Pick<Dependencies, 'secretRepository'>) {
    this.secretRepository = secretRepository
  }

  async execute(secret: SaveSecretCommand) {
    await this.secretRepository.save(secret)
    return new SaveSecretResponse(secret)
  }
}
