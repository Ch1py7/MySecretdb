import { saveSecretCommandConstructor } from 'application/types/save-secret-constructor'

export class SaveSecretCommand {
  public age: number
  public gender: 'man' | 'woman' | 'other'
  public anonName: string
  public secret: string
  public likes: number

  constructor({age, gender, secret, likes, anonName}: saveSecretCommandConstructor) {
    this.age = age
    this.gender = gender
    this.anonName = anonName
    this.secret = secret
    this.likes = likes
  }
}