import { ObjectId } from 'mongodb'

export interface UpdateLikeResponseConstructor {
  id: ObjectId
}

export interface UpdateLikeCommandConstructor {
  id: ObjectId
  isLike: boolean
  likes: number
}