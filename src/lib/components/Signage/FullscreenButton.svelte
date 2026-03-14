<script lang="ts">
	import { SIGNAGE_FOCUS_RING } from '$lib/constants/signage'
	import { onMount } from 'svelte'

	let is_fullscreen = $state(false)
	let is_transitioning = false

	function handle_fullscreen_change(): void {
		is_fullscreen = document.fullscreenElement !== null
		is_transitioning = false
	}

	function blur_button(event: MouseEvent): void {
		const button = event.currentTarget
		if (button instanceof HTMLElement) button.blur()
	}

	function toggle_fullscreen(event: MouseEvent): void {
		if (is_transitioning) return

		is_transitioning = true

		if (is_fullscreen) {
			void document.exitFullscreen()
		} else {
			void document.documentElement.requestFullscreen()
		}

		blur_button(event)
	}

	onMount(() => {
		is_fullscreen = document.fullscreenElement !== null
		document.addEventListener('fullscreenchange', handle_fullscreen_change)

		return function (): void {
			document.removeEventListener('fullscreenchange', handle_fullscreen_change)
		}
	})
</script>

<button
	type="button"
	class="flex h-[max(4vh,32px)] w-[max(4vh,32px)] shrink-0 cursor-pointer items-center justify-center rounded text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:outline-none {SIGNAGE_FOCUS_RING}"
	aria-label={is_fullscreen ? 'フルスクリーン解除' : 'フルスクリーン'}
	onclick={toggle_fullscreen}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="block h-[max(2vh,16px)] w-[max(2vh,16px)]"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		{#if is_fullscreen}
			<path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
			<path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
			<path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
			<path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
		{:else}
			<path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
			<path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
			<path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
			<path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
		{/if}
	</svg>
</button>
