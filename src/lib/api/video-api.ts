interface VideoMetadata {
	title: string
	duration_seconds: number | undefined
}

const metadata_cache: Record<string, VideoMetadata> = {}

async function fetch_metadata(video_id: string): Promise<VideoMetadata | undefined> {
	if (metadata_cache[video_id]) {
		return metadata_cache[video_id]
	}

	const response = await fetch(`/api/video/${video_id}`)
	if (!response.ok) return undefined

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- JSON from API
	const data = (await response.json()) as VideoMetadata

	const result = {
		title: data.title,
		duration_seconds: data.duration_seconds,
	}

	/* eslint-disable require-atomic-updates -- caching logic allows replacing */
	metadata_cache[video_id] = result
	/* eslint-enable require-atomic-updates */

	return result
}

const video_api = {
	fetch_metadata,
}

export { video_api }
export type { VideoMetadata }
