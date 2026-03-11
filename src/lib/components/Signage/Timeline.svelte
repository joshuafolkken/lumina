<script lang="ts">
	import ThumbnailItem from './ThumbnailItem.svelte'

	const SCROLL_IDLE_THRESHOLD_MS = 7000
	const CLICK_SCROLL_DELAY_MS = 1000
	const SMOOTH_SCROLL_MAX_DURATION_MS = 1000
	const HALF_DIVISOR = 2

	interface Props {
		video_ids: ReadonlyArray<string>
		current_index: number
		progress: number
		on_select: (index: number) => void
	}

	const { video_ids, current_index, progress, on_select }: Props = $props()

	let container = $state<HTMLElement | undefined>()
	let last_user_scroll_ms = 0
	let did_user_select = false
	let auto_scroll_timer: NodeJS.Timeout | number = 0
	let is_programmatic_scrolling = false
	let scroll_reset_timer: NodeJS.Timeout | number = 0

	function time_since_last_user_scroll_ms(): number {
		return Date.now() - last_user_scroll_ms
	}

	function is_scroll_idle(): boolean {
		return time_since_last_user_scroll_ms() >= SCROLL_IDLE_THRESHOLD_MS
	}

	function reset_programmatic_scroll(): void {
		clearTimeout(scroll_reset_timer)
		is_programmatic_scrolling = false
	}

	function begin_programmatic_scroll(): void {
		is_programmatic_scrolling = true
		clearTimeout(scroll_reset_timer)
		scroll_reset_timer = setTimeout(reset_programmatic_scroll, SMOOTH_SCROLL_MAX_DURATION_MS)
	}

	function scroll_to_index(index: number): void {
		if (!container) return
		const item = container.children.item(index)
		if (!(item instanceof HTMLElement)) return

		const scroll_left =
			item.offsetLeft - container.clientWidth / HALF_DIVISOR + item.offsetWidth / HALF_DIVISOR
		begin_programmatic_scroll()
		container.scrollTo({ left: scroll_left, behavior: 'smooth' })
	}

	function cancel_auto_scroll(): void {
		clearTimeout(auto_scroll_timer)
	}

	function schedule_scroll_to_index(index: number, delay_ms: number): void {
		cancel_auto_scroll()

		if (delay_ms === 0) {
			scroll_to_index(index)
			return
		}

		auto_scroll_timer = setTimeout(() => {
			scroll_to_index(index)
		}, delay_ms)
	}

	function calc_scroll_delay_ms(): number {
		if (did_user_select) return CLICK_SCROLL_DELAY_MS
		if (is_scroll_idle()) return 0
		return SCROLL_IDLE_THRESHOLD_MS - time_since_last_user_scroll_ms()
	}

	$effect(() => {
		const index = current_index
		const delay_ms = calc_scroll_delay_ms()
		did_user_select = false

		schedule_scroll_to_index(index, delay_ms)

		return cancel_auto_scroll
	})

	function handle_user_scroll(): void {
		if (is_programmatic_scrolling) return
		last_user_scroll_ms = Date.now()
		cancel_auto_scroll()
	}

	function handle_scroll_end(): void {
		if (is_programmatic_scrolling) {
			reset_programmatic_scroll()
			return
		}

		schedule_scroll_to_index(current_index, SCROLL_IDLE_THRESHOLD_MS)
	}

	function make_select_handler(item_index: number): () => void {
		return function (): void {
			did_user_select = true
			on_select(item_index)
		}
	}
</script>

<div
	bind:this={container}
	class="flex h-[15vh] shrink-0 flex-row gap-[1vh] overflow-x-auto overflow-y-hidden bg-gray-900 p-[1vh]"
	onscroll={handle_user_scroll}
	onscrollend={handle_scroll_end}
>
	{#each video_ids as video_id, index (video_id)}
		<ThumbnailItem
			{video_id}
			is_active={index === current_index}
			progress={index === current_index ? progress : 0}
			on_select={make_select_handler(index)}
		/>
	{/each}
</div>
