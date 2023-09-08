import { UpdateLikeCommandConstructor } from 'application/types/update-like-constructor'

export class UpdateLikeCommand {
  id: string
  isLike: boolean
  likes: number

  constructor({ id, isLike, likes }: UpdateLikeCommandConstructor) {
    this.id = id
    this.isLike = isLike
    this.likes = likes
  }
}
