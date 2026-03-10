import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { building } from '$app/environment'
import { getTextDirection } from '$lib/paraglide/runtime'
import { paraglideMiddleware } from '$lib/paraglide/server'
import { auth_module } from '$lib/server/auth'
import { svelteKitHandler } from 'better-auth/svelte-kit'

const handle_paraglide: Handle = async ({ event, resolve }) =>
	await paraglideMiddleware(event.request, async ({ request, locale }) => {
		event.request = request

		return await resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale)),
		})
	})

const handle_better_auth: Handle = async ({ event, resolve }) => {
	const session = await auth_module.auth.api.getSession({ headers: event.request.headers })

	if (session) {
		// eslint-disable-next-line require-atomic-updates
		event.locals.session = session.session
		// eslint-disable-next-line require-atomic-updates
		event.locals.user = session.user
	}

	return await svelteKitHandler({ event, resolve, auth: auth_module.auth, building })
}

// eslint-disable-next-line no-restricted-syntax
export const handle: Handle = sequence(handle_paraglide, handle_better_auth)
