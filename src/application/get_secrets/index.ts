import { GetSecretsCommand } from './get-secrets-command'

export class GetSecrets {
  secretRepository: Dependencies['secretRepository']

  constructor({ secretRepository }: Pick<Dependencies, 'secretRepository'>) {
    this.secretRepository = secretRepository
  }

  async execute({ pageNumber, limit }: GetSecretsCommand) {
    return await this.secretRepository.getSecrets({ pageNumber, limit })
  }
}
