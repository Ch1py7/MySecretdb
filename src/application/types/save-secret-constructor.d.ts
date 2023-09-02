

export interface SaveSecretResponseConstructor {
  age: number,
  gender: 'man' | 'woman' | 'other',
  secret: string,
  anonName: string
  likes: number,
}

export interface SaveSecretCommandConstructor {
  age: number,
  gender: 'man' | 'woman' | 'other',
  secret: string,
  anonName: string
  likes: number,
}