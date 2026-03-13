/// <reference lib="webworker" />
import { build, files, version } from '$service-worker'

declare const self: ServiceWorkerGlobalScope

const CACHE = `lumina-${version}`
const ASSETS = [...build, ...files]
const HTTP_OK = 200

async function add_files_to_cache(): Promise<void> {
	const cache = await caches.open(CACHE)
	await cache.addAll(ASSETS)
}

async function delete_old_caches(): Promise<void> {
	for (const key of await caches.keys()) {
		if (key !== CACHE) await caches.delete(key)
	}
}

async function get_cached_asset(cache: Cache, pathname: string): Promise<Response | undefined> {
	if (!ASSETS.includes(pathname)) return undefined
	return await cache.match(pathname)
}

async function fetch_and_cache(cache: Cache, request: Request): Promise<Response> {
	const response = await fetch(request)

	if (response.status === HTTP_OK) {
		void cache.put(request, response.clone())
	}

	return response
}

async function get_from_cache_or_network(cache: Cache, request: Request): Promise<Response> {
	try {
		return await fetch_and_cache(cache, request)
	} catch {
		const cached = await cache.match(request)
		if (cached) return cached
		throw new Error('network failed and no cache available')
	}
}

async function respond(event: FetchEvent, url: URL): Promise<Response> {
	const cache = await caches.open(CACHE)
	const cached_asset = await get_cached_asset(cache, url.pathname)
	return cached_asset ?? (await get_from_cache_or_network(cache, event.request))
}

self.addEventListener('install', (event) => {
	event.waitUntil(add_files_to_cache())
})

self.addEventListener('activate', (event) => {
	event.waitUntil(delete_old_caches())
})

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return

	const url = new URL(event.request.url)

	if (url.origin !== self.location.origin) return

	event.respondWith(respond(event, url))
})
