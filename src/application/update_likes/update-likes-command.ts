import { UpdateLikeCommandConstructor } from 'application/types/update-like-constructor'
import { ObjectId } from 'mongodb'

export class UpdateLikeCommand {
  id: ObjectId
  isLike: boolean
  likes: number

  constructor({ id, isLike, likes }: UpdateLikeCommandConstructor) {
    this.id = id
    this.isLike = isLike
    this.likes = likes
  }
}