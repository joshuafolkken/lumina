const STORAGE_KEY = 'sound_enabled'

function load(): boolean {
	const stored = localStorage.getItem(STORAGE_KEY)
	return stored === null ? true : stored === 'true'
}

function save(is_enabled: boolean): void {
	localStorage.setItem(STORAGE_KEY, String(is_enabled))
}

const volume_preference = {
	load,
	save,
}

export { volume_preference }
