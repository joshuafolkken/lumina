<script lang="ts">
	import { PERCENT } from '$lib/constants/ui'

	const TAP_THRESHOLD_PX = 5
	const THUMBNAIL_BASE_URL = 'https://img.youtube.com/vi'

	interface Props {
		video_id: string
		is_active: boolean
		progress: number
		on_select: () => void
		on_seek: (delta_pixels: number) => void
	}

	const { video_id, is_active, progress, on_select, on_seek }: Props = $props()

	let touch_start_y = 0

	function thumbnail_url(id: string): string {
		return `${THUMBNAIL_BASE_URL}/${id}/mqdefault.jpg`
	}

	function handle_touch_start(event_: TouchEvent): void {
		touch_start_y = event_.touches[0]?.clientY ?? 0
	}

	function handle_touch_end(event_: TouchEvent): void {
		event_.preventDefault()

		const end_y = event_.changedTouches[0]?.clientY ?? touch_start_y
		const delta = touch_start_y - end_y

		if (is_active && Math.abs(delta) >= TAP_THRESHOLD_PX) {
			on_seek(delta)
			return
		}

		on_select()
	}

	function handle_keydown(event_: KeyboardEvent): void {
		if (event_.key === 'Enter') on_select()
	}
</script>

<div
	class="relative aspect-video h-full shrink-0 cursor-pointer overflow-hidden rounded transition-all duration-200"
	class:ring-2={is_active}
	class:ring-white={is_active}
	ontouchstart={handle_touch_start}
	ontouchend={handle_touch_end}
	onclick={on_select}
	onkeydown={handle_keydown}
	role="button"
	tabindex="0"
>
	<img
		src={thumbnail_url(video_id)}
		alt="Video thumbnail"
		class="block w-full object-cover"
		draggable="false"
	/>
	{#if is_active}
		<div
			class="absolute bottom-0 left-0 h-1 bg-red-500 transition-all duration-500"
			style:width="{progress * PERCENT}%"
		></div>
	{/if}
</div>
