import { UpdateLikeResponseConstructor } from 'application/types/update-like-constructor'

export class UpdateLikeResponse {
  id: string
  isLike: boolean

  constructor({ id, isLike }: UpdateLikeResponseConstructor) {
    this.id = id
    this.isLike = isLike
  }

  getMessage() {
    if (this.isLike) {
      return `Like increased by 1 for ${this.id}`
    } else {
      return `Like decreased by 1 for ${this.id}`
    }
  }
}
