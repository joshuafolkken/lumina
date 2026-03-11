<script lang="ts">
	import BrandLogoScroller from '$lib/components/Signage/BrandLogoScroller.svelte'
	import FullscreenButton from '$lib/components/Signage/FullscreenButton.svelte'
	import Timeline from '$lib/components/Signage/Timeline.svelte'
	import { VIDEO_IDS } from '$lib/constants/video-ids'
	import { YOUTUBE_IFRAME_API } from '$lib/constants/youtube'
	import { volume_preference } from '$lib/storage/volume-preference'
	import { onMount } from 'svelte'

	const PROGRESS_INTERVAL_MS = 100
	const PLAYER_ELEMENT_ID = 'yt-player'

	// eslint-disable-next-line init-declarations
	let player: YT.Player | undefined
	let signage_root = $state<HTMLElement | undefined>()
	let current_index = $state(0)
	let progress = $state(0)
	// eslint-disable-next-line init-declarations
	let is_muted_previous: boolean | undefined

	function get_video_id(index: number): string {
		return VIDEO_IDS[index % VIDEO_IDS.length] ?? VIDEO_IDS[0]
	}

	function update_progress(): void {
		if (!player) return
		if (player.getPlayerState() !== YT.PlayerState.PLAYING) return

		const total = player.getDuration()

		if (total > 0) {
			progress = player.getCurrentTime() / total
		}
	}

	function detect_and_save_mute_change(): void {
		if (!player) return
		const is_muted = player.isMuted()
		if (is_muted_previous === is_muted) return
		is_muted_previous = is_muted
		volume_preference.save(!is_muted)
	}

	function tick(): void {
		update_progress()
		detect_and_save_mute_change()
	}

	function switch_to_video(index: number): void {
		if (index === current_index) return

		current_index = index
		progress = 0
		player?.loadVideoById(get_video_id(index))
	}

	function handle_state_change(event: YT.PlayerStateEvent): void {
		if (event.data !== YT.PlayerState.ENDED) return

		switch_to_video((current_index + 1) % VIDEO_IDS.length)
	}

	function handle_player_ready(event: YT.PlayerReadyEvent): void {
		event.target.playVideo()

		if (volume_preference.load()) {
			event.target.unMute()
		}
	}

	function init_player(): void {
		const yt_api = globalThis.YT

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!yt_api) return

		/* eslint-disable @typescript-eslint/naming-convention */
		player = new yt_api.Player(PLAYER_ELEMENT_ID, {
			videoId: VIDEO_IDS[0],
			width: '100%',
			height: '100%',
			playerVars: {
				autoplay: 1,
				controls: 1,
				fs: 0,
				rel: 0,
				modestbranding: 1,
				playsinline: 1,
				iv_load_policy: 3,
				mute: 1,
			},
			events: {
				onReady: handle_player_ready,
				onStateChange: handle_state_change,
			},
		})
		/* eslint-enable @typescript-eslint/naming-convention */
	}

	function load_youtube_api(): void {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (globalThis.YT?.Player) {
			init_player()
			return
		}

		globalThis.onYouTubeIframeAPIReady = init_player
		const script = document.createElement('script')
		script.src = YOUTUBE_IFRAME_API
		document.head.append(script)
	}

	onMount(() => {
		load_youtube_api()
		const interval = setInterval(tick, PROGRESS_INTERVAL_MS)

		return function (): void {
			clearInterval(interval)
			player?.destroy()
		}
	})
</script>

<h1 class="sr-only">Lumina</h1>
<div bind:this={signage_root} class="signage-root flex w-screen flex-col overflow-hidden bg-black">
	<div class="flex min-h-0 flex-1 flex-col">
		<div class="flex min-h-0 flex-1">
			<div class="min-h-0 flex-1">
				<div id={PLAYER_ELEMENT_ID} class="video-container h-full w-full"></div>
			</div>
			<BrandLogoScroller />
		</div>
		<Timeline video_ids={VIDEO_IDS} {current_index} {progress} on_select={switch_to_video} />
	</div>
	<div class="flex shrink-0 items-center gap-3 bg-gray-900 px-2 py-0.5">
		<div class="min-w-0 flex-1 text-right">
			<span class="text-xs text-white/70">
				<span class="font-bold">Lumina</span> powered by
				<a
					href="https://joshuafolkken.com"
					target="_blank"
					rel="noopener noreferrer"
					class="text-white/70 underline hover:text-white"
				>
					Joshua Studio
				</a>
			</span>
		</div>
		<FullscreenButton target={signage_root} />
	</div>
</div>

<style>
	.signage-root {
		height: 100vh;
		height: 100dvh;
		min-height: 0;
	}

	.signage-root:fullscreen {
		outline: none;
	}

	.signage-root:-webkit-full-screen {
		outline: none;
	}

	.signage-root:-moz-full-screen {
		outline: none;
	}

	.signage-root:-ms-fullscreen {
		outline: none;
	}

	.video-container :global(iframe) {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
