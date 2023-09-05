export interface UpdateLikeResponseConstructor {
  id: string
}

export interface UpdateLikeCommandConstructor {
  id: string
  isLike: boolean
  likes: number
}