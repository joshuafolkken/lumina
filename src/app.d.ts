import type { Session, User } from 'better-auth/minimal'

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	const __APP_VERSION__: string

	interface Env {
		YOUTUBE_API_KEY?: string
	}

	namespace App {
		interface Platform {
			env: Env
			ctx: ExecutionContext
			caches: CacheStorage
			cf?: IncomingRequestCfProperties
		}

		interface Locals {
			user?: User
			session?: Session
		}

		// interface Error {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {}
