import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { getRequestEvent } from '$app/server'
import { env } from '$env/dynamic/private'
import { database_module } from '$lib/server/db'
import { betterAuth } from 'better-auth/minimal'
import { sveltekitCookies } from 'better-auth/svelte-kit'

/* eslint-disable @typescript-eslint/naming-convention -- betterAuth API options use camelCase */
const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(database_module.database, { provider: 'sqlite' }),
	emailAndPassword: { enabled: true },
	plugins: [sveltekitCookies(getRequestEvent)], // make sure this is the last plugin in the array
})
/* eslint-enable @typescript-eslint/naming-convention */

export const auth_module = { auth }
