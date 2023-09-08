export class IdGenerator {
  private _crypto: Dependencies['crypto']

  constructor({ crypto }: Pick<Dependencies, 'crypto'>) {
    this._crypto = crypto
  }

  generate() {
    return this._crypto.webcrypto.randomUUID()
  }
}
