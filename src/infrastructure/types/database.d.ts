import { Db } from 'mongodb'

export interface DbHandler {
	getInstance: () => Promise<Db>
	disconnect: () => void
}