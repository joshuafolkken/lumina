<script lang="ts">
	import { video_api, type VideoMetadata } from '$lib/api/video-api'
	import { SHOW_THUMBNAIL_METADATA_ALWAYS, SIGNAGE_RING_ACTIVE } from '$lib/constants/signage'
	import { PERCENT } from '$lib/constants/ui'
	import { youtube } from '$lib/constants/youtube'
	import { time_format } from '$lib/utils/time-format'
	import { touch_utilities } from '$lib/utils/touch-utilities'

	interface Props {
		video_id: string
		is_active: boolean
		progress: number
		on_select: () => void
	}

	const { video_id, is_active, progress, on_select }: Props = $props()

	let is_hovering = $state(false)
	let metadata = $state<VideoMetadata | undefined>()

	async function fetch_and_set_metadata(): Promise<void> {
		if (metadata !== undefined) return

		const result = await video_api.fetch_metadata(video_id)
		/* eslint-disable require-atomic-updates -- safe cache population */
		if (result) metadata = result
		/* eslint-enable require-atomic-updates */
	}

	$effect(() => {
		/* eslint-disable @typescript-eslint/no-unnecessary-condition -- configurable via SHOW_THUMBNAIL_METADATA_ALWAYS */
		if (SHOW_THUMBNAIL_METADATA_ALWAYS) void fetch_and_set_metadata()
		/* eslint-enable @typescript-eslint/no-unnecessary-condition */
	})

	function handle_mouse_enter(): void {
		is_hovering = true
		void fetch_and_set_metadata()
	}

	/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- configurable via SHOW_THUMBNAIL_METADATA_ALWAYS */
	const should_show_metadata = $derived(SHOW_THUMBNAIL_METADATA_ALWAYS || is_hovering)

	const duration_display = $derived.by((): string => {
		if (metadata === undefined) return '…'
		if (metadata.duration_seconds === undefined) return '?:??'

		return time_format.duration(metadata.duration_seconds)
	})

	function handle_mouse_leave(): void {
		is_hovering = false
	}

	let touch_start_x = 0
	let touch_start_y = 0
	let did_scroll = false

	function handle_touch_start(event_: TouchEvent): void {
		touch_start_x = event_.touches[0]?.clientX ?? 0
		touch_start_y = event_.touches[0]?.clientY ?? 0
		did_scroll = false
	}

	function handle_touch_move(event_: TouchEvent): void {
		const [touch] = event_.touches
		if (!touch) return

		const delta_x = Math.abs(touch.clientX - touch_start_x)
		const delta_y = Math.abs(touch.clientY - touch_start_y)

		did_scroll = did_scroll || touch_utilities.exceeds_tap_threshold(delta_x, delta_y)
	}

	function try_handle_scroll(delta_x: number, delta_y: number): boolean {
		const is_scroll = did_scroll || touch_utilities.exceeds_tap_threshold(delta_x, delta_y)
		if (!is_scroll) return false

		did_scroll = true
		return true
	}

	function handle_touch_end(event_: TouchEvent): void {
		event_.preventDefault()

		const { delta_x, delta_y } = touch_utilities.get_touch_deltas(event_, {
			x: touch_start_x,
			y: touch_start_y,
		})

		if (try_handle_scroll(delta_x, delta_y)) return

		on_select()
	}

	function handle_click(event_: MouseEvent): void {
		if (did_scroll) {
			event_.preventDefault()
			event_.stopPropagation()
			setTimeout(() => {
				did_scroll = false
			}, 0)

			return
		}

		on_select()
	}

	function handle_keydown(event_: KeyboardEvent): void {
		if (event_.key === 'Enter') on_select()
	}
</script>

<div
	class="relative aspect-video w-full shrink-0 cursor-pointer overflow-hidden rounded transition-all duration-200 {is_active
		? `${SIGNAGE_RING_ACTIVE} ring-white`
		: ''}"
	onmouseenter={handle_mouse_enter}
	onmouseleave={handle_mouse_leave}
	ontouchstart={handle_touch_start}
	ontouchmove={handle_touch_move}
	ontouchend={handle_touch_end}
	onclick={handle_click}
	onkeydown={handle_keydown}
	role="button"
	tabindex="0"
>
	<img
		src={youtube.thumbnail_url(video_id)}
		alt="Video thumbnail"
		class="block w-full object-cover"
		draggable="false"
	/>
	{#if should_show_metadata}
		<div class="absolute inset-0 p-[1vh]" aria-hidden="true">
			<p
				class="thumbnail-overlay-text -mx-[0.5vh] line-clamp-2 px-[0.5vh] leading-tight font-medium"
			>
				{metadata?.title ?? '…'}
			</p>
			<p class="thumbnail-overlay-text absolute right-[1vh] bottom-[1vh]">
				{duration_display}
			</p>
		</div>
	{/if}
	{#if is_active}
		<div
			class="absolute bottom-0 left-0 h-[0.5vh] bg-red-500 transition-all duration-500"
			style:width="{progress * PERCENT}%"
		></div>
	{/if}
</div>

<style>
	.thumbnail-overlay-text {
		font-size: var(--signage-font-size-small);
		color: white;
		text-shadow:
			0 0 2px black,
			0 0 4px black,
			0 1px 2px black,
			1px 0 2px black,
			-1px 0 2px black,
			0 -1px 2px black,
			1px 1px 2px black,
			-1px -1px 2px black;
	}
</style>
