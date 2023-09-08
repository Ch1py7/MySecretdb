export interface UpdateLikeResponseConstructor {
  id: string
  isLike: boolean
}

export interface UpdateLikeCommandConstructor {
  id: string
  isLike: boolean
  likes: number
}
