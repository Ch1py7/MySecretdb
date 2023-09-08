import { Db } from 'mongodb'
import { MUUID } from 'uuid-mongodb'

export interface DbHandler {
	getInstance: () => Promise<Db>
	disconnect: () => void
}

export interface Collection {
  _id: MUUID
  age: number
  gender: 'man' | 'woman' | 'other'
  secret: string
  anonName: string
  likes: number
}
