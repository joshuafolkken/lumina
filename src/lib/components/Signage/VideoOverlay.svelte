<script lang="ts">
	import { PERCENT } from '$lib/constants/ui'

	const SECONDS_PER_MINUTE = 60
	const TIME_DIGIT_WIDTH = 2
	const SEEK_STEP = 0.01

	interface Props {
		progress: number
		duration: number
		on_seek: (ratio: number) => void
	}

	const { progress, duration, on_seek }: Props = $props()

	let is_hovering = $state(false)
	let hover_ratio = $state(0)

	const current_time = $derived(progress * duration)

	function format_time(total_seconds: number): string {
		const mins = Math.floor(total_seconds / SECONDS_PER_MINUTE)
		const secs = Math.floor(total_seconds % SECONDS_PER_MINUTE)
		return `${mins.toString()}:${secs.toString().padStart(TIME_DIGIT_WIDTH, '0')}`
	}

	function calculate_ratio(event: MouseEvent): number {
		const element = event.currentTarget
		if (!(element instanceof HTMLElement)) return 0
		const rect = element.getBoundingClientRect()
		return Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
	}

	function handle_mouse_enter(): void {
		is_hovering = true
	}

	function handle_mouse_leave(): void {
		is_hovering = false
	}

	function handle_mouse_move(event: MouseEvent): void {
		hover_ratio = calculate_ratio(event)
	}

	function handle_seek_click(event: MouseEvent): void {
		on_seek(calculate_ratio(event))
	}

	function handle_seekbar_keydown(event: KeyboardEvent): void {
		if (event.key === 'ArrowLeft') on_seek(Math.max(0, progress - SEEK_STEP))
		if (event.key === 'ArrowRight') on_seek(Math.min(1, progress + SEEK_STEP))
	}
</script>

<div
	class="absolute inset-0"
	role="region"
	aria-label="Video player controls"
	onmouseenter={handle_mouse_enter}
	onmouseleave={handle_mouse_leave}
>
	{#if is_hovering}
		<div class="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/70 to-transparent p-4">
			<div class="mb-2 flex justify-between text-sm text-white">
				<span>{format_time(current_time)}</span>
				<span>{format_time(duration)}</span>
			</div>
			<div
				class="relative h-2 cursor-pointer rounded bg-white/30"
				onmousemove={handle_mouse_move}
				onclick={handle_seek_click}
				onkeydown={handle_seekbar_keydown}
				role="slider"
				aria-valuemin={0}
				aria-valuemax={duration}
				aria-valuenow={current_time}
				tabindex="0"
			>
				<div
					class="absolute top-0 left-0 h-full rounded bg-red-500"
					style:width="{progress * PERCENT}%"
				></div>
				<div
					class="absolute top-0 h-full w-0.5 bg-white/80"
					style:left="{hover_ratio * PERCENT}%"
				></div>
			</div>
		</div>
	{/if}
</div>
