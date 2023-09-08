import { UpdateLikeCommand } from './update-likes-command'
import { UpdateLikeResponse } from './update-likes-response'

export class UpdateLike {
  secretRepository: Dependencies['secretRepository']

  constructor({ secretRepository }: Pick<Dependencies, 'secretRepository'>) {
    this.secretRepository = secretRepository
  }

  async execute({ id, isLike, likes }: UpdateLikeCommand) {
    const likeData = { id, isLike, likes}

    await this.secretRepository.updateLike(likeData)

    return new UpdateLikeResponse({ id, isLike })
  }
}
