/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion -- JSON from external API */
import { json } from '@sveltejs/kit'
import type { VideoMetadata } from '$lib/api/video-api'
import { youtube, YOUTUBE_OEMBED_URL, YOUTUBE_PLAYER_URL } from '$lib/constants/youtube'
import type { RequestHandler } from './$types'

interface OembedResponse {
	title?: string
}

/* eslint-disable @typescript-eslint/naming-convention -- YouTube API response uses camelCase */
interface PlayerResponse {
	videoDetails?: {
		lengthSeconds?: string
	}
}
/* eslint-enable @typescript-eslint/naming-convention */

async function fetch_title(video_id: string): Promise<string | undefined> {
	const url = `${YOUTUBE_OEMBED_URL}?url=${youtube.watch_url(video_id)}&format=json`
	const response = await fetch(url)
	if (!response.ok) return undefined

	const data = (await response.json()) as OembedResponse
	return data.title
}

async function fetch_duration(video_id: string): Promise<number | undefined> {
	/* eslint-disable @typescript-eslint/naming-convention -- YouTube API expects camelCase */
	const body = {
		context: {
			client: {
				clientName: 'WEB',
				clientVersion: '2.20250116.10.00',
			},
		},
		videoId: video_id,
	}
	/* eslint-enable @typescript-eslint/naming-convention */

	const response = await fetch(YOUTUBE_PLAYER_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})

	if (!response.ok) return undefined

	const data = (await response.json()) as PlayerResponse
	const length_string = data.videoDetails?.lengthSeconds
	if (length_string === undefined) return undefined

	const seconds = Number.parseInt(length_string, 10)
	return Number.isNaN(seconds) ? undefined : seconds
}

export const GET: RequestHandler = async ({ params }) => {
	const video_id = params.id

	if (!video_id) {
		return json({ error: 'Missing video id' }, { status: 400 })
	}

	const [title, duration_seconds] = await Promise.all([
		fetch_title(video_id),
		fetch_duration(video_id),
	])

	const metadata: VideoMetadata = {
		title: title ?? '',
		duration_seconds,
	}
	return json(metadata)
}
