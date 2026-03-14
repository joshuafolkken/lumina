const YOUTUBE_BASE = 'https://www.youtube.com'

/** YouTube IFrame API: iv_load_policy - アノテーション非表示 */
const IV_LOAD_POLICY_ANNOTATIONS_OFF = 3

const YOUTUBE_OEMBED_URL = `${YOUTUBE_BASE}/oembed`
const YOUTUBE_IFRAME_API = `${YOUTUBE_BASE}/iframe_api`
const YOUTUBE_THUMBNAIL_BASE_URL = 'https://img.youtube.com/vi'

function watch_url(video_id: string): string {
	return `${YOUTUBE_BASE}/watch?v=${video_id}`
}

function thumbnail_url(video_id: string): string {
	return `${YOUTUBE_THUMBNAIL_BASE_URL}/${video_id}/mqdefault.jpg`
}

const youtube = {
	watch_url,
	thumbnail_url,
}

const YOUTUBE_DATA_API_URL = 'https://www.googleapis.com/youtube/v3/videos'

export {
	IV_LOAD_POLICY_ANNOTATIONS_OFF,
	YOUTUBE_DATA_API_URL,
	YOUTUBE_OEMBED_URL,
	YOUTUBE_IFRAME_API,
	YOUTUBE_THUMBNAIL_BASE_URL,
	youtube,
}
