import { ObjectId } from 'mongodb'
import { UpdateLikeCommand } from './update-likes-command'
import { UpdateLikeResponse } from './update-likes-response'

export class UpdateLike {
  secretRepository: Dependencies['secretRepository']

  constructor({ secretRepository }: Pick<Dependencies, 'secretRepository'>) {
    this.secretRepository = secretRepository
  }

  async execute({ id, isLike, likes }: UpdateLikeCommand) {
    const _id = new ObjectId(id)
    const updateLike = { $set: { likes: isLike ? likes + 1 : likes } }
    const like = { _id, updateLike}

    await this.secretRepository.updateLike(like)

    return new UpdateLikeResponse({ id }).getMessage(isLike)
  }
}