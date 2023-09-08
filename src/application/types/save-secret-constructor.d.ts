export interface SaveSecretResponseConstructor {
  id: string
  secret: string
}

export interface SaveSecretCommandConstructor {
  age: number
  gender: 'man' | 'woman' | 'other'
  secret: string
  anonName: string
  likes: number
}
