const TAP_THRESHOLD_PX = 5

function exceeds_tap_threshold(delta_x: number, delta_y: number): boolean {
	return delta_x >= TAP_THRESHOLD_PX || delta_y >= TAP_THRESHOLD_PX
}

function get_touch_deltas(
	event: TouchEvent,
	start: { x: number; y: number },
): { delta_x: number; delta_y: number } {
	const [touch] = event.changedTouches
	const end_x = touch?.clientX ?? start.x
	const end_y = touch?.clientY ?? start.y
	return {
		delta_x: Math.abs(end_x - start.x),
		delta_y: Math.abs(end_y - start.y),
	}
}

export const touch_utilities = {
	exceeds_tap_threshold,
	get_touch_deltas,
}
