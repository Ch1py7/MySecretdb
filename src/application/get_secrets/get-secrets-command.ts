import { GetSecretsCommandConstructor } from 'application/types/get-secrets-constructor'

export class GetSecretsCommand {
  pageNumber: number
  limit: number

  constructor({ pageNumber, limit }: GetSecretsCommandConstructor) {
    this.pageNumber = pageNumber
    this.limit = limit
  }
}
