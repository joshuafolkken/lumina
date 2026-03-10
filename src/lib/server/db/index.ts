import { createClient } from '@libsql/client'
import { env } from '$env/dynamic/private'
import { drizzle } from 'drizzle-orm/libsql'
import { schema } from './schema'

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set')

const client = createClient({ url: env.DATABASE_URL })

const database = drizzle(client, { schema })
export const database_module = { database }
