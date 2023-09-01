import { saveSecretResponseConstructor } from 'application/types/save-secret-constructor'

export class SaveSecretResponse {
  private _age: number
  private _gender: 'man' | 'woman' | 'other'
  private _anonName: string
  private _secret: string
  private _likes: number

  constructor({ age, anonName, gender, likes, secret }: saveSecretResponseConstructor) {
    this._age = age
    this._gender = gender
    this._anonName = anonName
    this._secret = secret
    this._likes = likes
  }
}