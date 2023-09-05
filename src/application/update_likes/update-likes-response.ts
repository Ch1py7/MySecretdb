import { UpdateLikeResponseConstructor } from 'application/types/update-like-constructor'

export class UpdateLikeResponse {
  private _id: string

  constructor({ id }: UpdateLikeResponseConstructor) {
    this._id = id
  }

  getMessage(isLike: boolean) {
    if (isLike) {
      return `Like increased by 1 for ${this._id}`
    } else {
      return `Like decreased by 1 for ${this._id}`
    }
  }
}