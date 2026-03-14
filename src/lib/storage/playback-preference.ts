const PLAYBACK_STATE_KEY = 'playback_state'

const DEFAULT_STATE: PlaybackState = { index: 0, time_seconds: 0 }

interface PlaybackState {
	index: number
	time_seconds: number
}

function load(): PlaybackState {
	const stored = localStorage.getItem(PLAYBACK_STATE_KEY)
	if (stored === null) return DEFAULT_STATE

	try {
		return JSON.parse(stored) as PlaybackState
	} catch {
		return DEFAULT_STATE
	}
}

function save(state: PlaybackState): void {
	localStorage.setItem(PLAYBACK_STATE_KEY, JSON.stringify(state))
}

const playback_preference = { load, save }

export type { PlaybackState }
export { playback_preference }
