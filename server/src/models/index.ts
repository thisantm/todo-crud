import pgPromise, { IDatabase, IMain } from 'pg-promise'
import dotenv from 'dotenv'

dotenv.config()

const pgp: IMain = pgPromise()

const connectionString: string = process.env.DATABASE_CONNECTION_STRING as string
if (!connectionString) {
  throw new Error('DATABASE_CONNECTION_STRING is not defined')
}

const db: IDatabase<{}> = pgp(connectionString)

export default db
