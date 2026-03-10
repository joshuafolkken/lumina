<script lang="ts">
	import Timeline from '$lib/components/Signage/Timeline.svelte'
	import { VIDEO_IDS } from '$lib/constants/video-ids'
	import { YOUTUBE_IFRAME_API } from '$lib/constants/youtube'
	import { onMount } from 'svelte'

	const PROGRESS_INTERVAL_MS = 100

	// eslint-disable-next-line init-declarations
	let player: YT.Player | undefined
	let current_index = $state(0)
	let progress = $state(0)

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
	}

	function init_player(): void {
		const yt_api = globalThis.YT

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!yt_api) return

		/* eslint-disable @typescript-eslint/naming-convention */
		player = new yt_api.Player('yt-player', {
			videoId: VIDEO_IDS[0],
			width: '100%',
			height: '100%',
			playerVars: {
				autoplay: 1,
				controls: 1,
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
		document.head.append(script as Node)
	}

	onMount(() => {
		load_youtube_api()
		const interval = setInterval(update_progress, PROGRESS_INTERVAL_MS)

		return function (): void {
			clearInterval(interval)
			player?.destroy()
		}
	})
</script>

<h1 class="sr-only">Signage</h1>
<div class="signage-root flex w-screen flex-col overflow-hidden bg-black">
	<div class="min-h-0 flex-1">
		<div id="yt-player" class="video-container h-full w-full"></div>
	</div>
	<Timeline video_ids={VIDEO_IDS} {current_index} {progress} on_select={switch_to_video} />
</div>

<style>
	.signage-root {
		height: 100vh;
		height: 100dvh;
		min-height: 0;
	}

	.video-container :global(iframe) {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
