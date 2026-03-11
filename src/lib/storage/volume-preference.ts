const VOLUME_LEVEL_KEY = 'volume_level'
const DEFAULT_VOLUME = 100

function load_level(): number {
	const stored = localStorage.getItem(VOLUME_LEVEL_KEY)
	return stored === null ? DEFAULT_VOLUME : Number(stored)
}

function save_level(level: number): void {
	localStorage.setItem(VOLUME_LEVEL_KEY, String(level))
}

const volume_preference = {
	load_level,
	save_level,
}

export { volume_preference }
