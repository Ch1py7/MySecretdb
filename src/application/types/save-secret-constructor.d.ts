

export interface saveSecretResponseConstructor {
  age: number,
  gender: 'man' | 'woman' | 'other',
  secret: string,
  anonName: string
  likes: number,
}

export interface saveSecretCommandConstructor {
  age: number,
  gender: 'man' | 'woman' | 'other',
  secret: string,
  anonName: string
  likes: number,
}