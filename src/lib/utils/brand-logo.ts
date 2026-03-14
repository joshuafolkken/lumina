function format_scale(value: number | undefined): string | undefined {
	return value === undefined ? undefined : `scale(${String(value)})`
}

function repeat_for_scroller<T>(items: ReadonlyArray<T>, count: number): ReadonlyArray<T> {
	return Array.from({ length: count }, () => [...items]).flat()
}

export const brand_logo = {
	format_scale,
	repeat_for_scroller,
}
