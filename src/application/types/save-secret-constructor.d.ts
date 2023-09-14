export interface SaveSecretResponseConstructor {
  id: string
  secret: string
  createdAt: number
}

export interface SaveSecretCommandConstructor {
  age: number
  gender: 'man' | 'woman' | 'other'
  secret: string
  anonName: string
  likes: number
}
