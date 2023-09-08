export interface SecretEntity {
  id: string
  age: number
  gender: 'man' | 'woman' | 'other'
  secret: string
  anonName: string
  likes: number
}
