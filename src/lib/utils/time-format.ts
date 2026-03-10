const SECONDS_PER_MINUTE = 60
const TIME_DIGIT_WIDTH = 2

function duration(total_seconds: number): string {
	const mins = Math.floor(total_seconds / SECONDS_PER_MINUTE)
	const secs = Math.floor(total_seconds % SECONDS_PER_MINUTE)
	return `${mins.toString()}:${secs.toString().padStart(TIME_DIGIT_WIDTH, '0')}`
}

export const time_format = {
	duration,
}
