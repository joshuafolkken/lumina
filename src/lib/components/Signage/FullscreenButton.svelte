<script lang="ts">
	import { onMount } from 'svelte'

	interface Props {
		target: HTMLElement | undefined
	}

	const { target }: Props = $props()

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
		if (!target || is_transitioning) return

		is_transitioning = true

		if (is_fullscreen) {
			void document.exitFullscreen()
		} else {
			void target.requestFullscreen()
		}

		blur_button(event)
	}

	onMount(() => {
		document.addEventListener('fullscreenchange', handle_fullscreen_change)

		return function (): void {
			document.removeEventListener('fullscreenchange', handle_fullscreen_change)
		}
	})
</script>

<button
	type="button"
	class="flex h-[max(4vh,32px)] w-[max(4vh,32px)] shrink-0 cursor-pointer items-center justify-center rounded text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-[0.3vh] focus-visible:ring-white/50"
	aria-label="フルスクリーン"
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
		<path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
		<path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
		<path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
		<path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
	</svg>
</button>
