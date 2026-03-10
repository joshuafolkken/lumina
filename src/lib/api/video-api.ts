const STORAGE_KEY_PREFIX = 'sign-cast:video-metadata:'
const DAYS_PER_WEEK = 7
const HOURS_PER_DAY = 24
const MINUTES_PER_HOUR = 60
const SECONDS_PER_MINUTE = 60
const MS_PER_SECOND = 1000
const CACHE_TTL_MS =
	DAYS_PER_WEEK * HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MS_PER_SECOND

interface VideoMetadata {
	title: string
	duration_seconds: number | undefined
}

interface CachedEntry {
	metadata: VideoMetadata
	cached_at: number
}

const metadata_cache: Record<string, VideoMetadata> = {}

function is_browser(): boolean {
	return 'localStorage' in globalThis
}

function get_from_storage(video_id: string): VideoMetadata | undefined {
	if (!is_browser()) return undefined

	try {
		const raw = globalThis.localStorage.getItem(`${STORAGE_KEY_PREFIX}${video_id}`)
		if (!raw) return undefined

		const entry = JSON.parse(raw) as CachedEntry
		const is_stale = Date.now() - entry.cached_at > CACHE_TTL_MS
		if (is_stale) return undefined

		return entry.metadata
	} catch {
		return undefined
	}
}

function save_to_storage(video_id: string, metadata: VideoMetadata): void {
	if (!is_browser()) return

	try {
		const entry: CachedEntry = { metadata, cached_at: Date.now() }
		globalThis.localStorage.setItem(`${STORAGE_KEY_PREFIX}${video_id}`, JSON.stringify(entry))
	} catch {
		// Storage full or disabled - ignore
	}
}

async function fetch_from_api(video_id: string): Promise<VideoMetadata | undefined> {
	const response = await fetch(`/api/video/${video_id}`)
	if (!response.ok) return undefined

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- JSON from API
	const data = (await response.json()) as VideoMetadata

	return {
		title: data.title,
		duration_seconds: data.duration_seconds,
	}
}

function cache_and_return(video_id: string, metadata: VideoMetadata): VideoMetadata {
	metadata_cache[video_id] = metadata
	save_to_storage(video_id, metadata)

	return metadata
}

async function fetch_metadata(video_id: string): Promise<VideoMetadata | undefined> {
	if (metadata_cache[video_id]) {
		return metadata_cache[video_id]
	}

	const stored = get_from_storage(video_id)

	if (stored) {
		metadata_cache[video_id] = stored

		return stored
	}

	const result = await fetch_from_api(video_id)

	if (!result) return undefined

	return cache_and_return(video_id, result)
}

const video_api = {
	fetch_metadata,
}

export { video_api }
export type { VideoMetadata }
