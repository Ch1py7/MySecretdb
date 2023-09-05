import { SaveSecretResponseConstructor } from 'application/types/save-secret-constructor'

export class SaveSecretResponse {
  public age: number
  public gender: 'man' | 'woman' | 'other'
  public anonName: string
  public secret: string
  public likes: number

  constructor({ age, anonName, gender, likes, secret }: SaveSecretResponseConstructor) {
    this.age = age
    this.gender = gender
    this.anonName = anonName
    this.secret = secret
    this.likes = likes
  }
}