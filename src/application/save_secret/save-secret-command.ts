import { SaveSecretCommandConstructor } from 'application/types/save-secret-constructor'

export class SaveSecretCommand {
  age: number
  gender: 'man' | 'woman' | 'other'
  anonName: string
  secret: string
  likes: number

  constructor({ age, gender, secret, likes, anonName }: SaveSecretCommandConstructor) {
    this.age = age
    this.gender = gender
    this.anonName = anonName
    this.secret = secret
    this.likes = likes
  }
}
