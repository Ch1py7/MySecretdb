import { Secret } from 'domain/secret/Secret'
import { SaveSecretCommand } from './save-secret-command'
import { SaveSecretResponse } from './save-secret-response'
export class SaveSecret {
  secretRepository: Dependencies['secretRepository']
  idGenerator: Dependencies['idGenerator']

  constructor({ secretRepository, idGenerator }: Pick<Dependencies, 'secretRepository' | 'idGenerator'>) {
    this.secretRepository = secretRepository
    this.idGenerator = idGenerator
  }

  async execute({ age, anonName, gender, likes, secret }: SaveSecretCommand) {
    const id = this.idGenerator.generate()

    const currentDate = new Date().getTime()

    const secretDomain = new Secret({
      createdAt: currentDate,
      id,
      age,
      anonName,
      gender,
      likes,
      secret
    })

    await this.secretRepository.save(secretDomain)

    return new SaveSecretResponse({ id, secret, createdAt: currentDate })
  }
}
