<script lang="ts">
	import { IV_LOAD_POLICY_ANNOTATIONS_OFF, YOUTUBE_IFRAME_API } from '$lib/constants/youtube'
	import { volume_preference } from '$lib/storage/volume-preference'
	import { onMount } from 'svelte'

	const PLAYER_ELEMENT_ID = 'yt-player'
	const PROGRESS_INTERVAL_MS = 100

	interface Props {
		video_ids: ReadonlyArray<string>
		current_index: number
		progress: number
		on_load_ready?: (load: (index: number) => void) => void
	}

	/* eslint-disable prefer-const, @typescript-eslint/no-useless-default-assignment, no-useless-assignment
		-- bindable props need let for mutation; $bindable() defaults required for Svelte 5 */
	let {
		video_ids,
		current_index = $bindable(0),
		progress = $bindable(0),
		on_load_ready,
	}: Props = $props()

	// eslint-disable-next-line init-declarations
	let player: YT.Player | undefined
	let is_player_ready = false
	// eslint-disable-next-line init-declarations
	let last_loaded_index: number | undefined
	// eslint-disable-next-line init-declarations
	let effective_volume_previous: number | undefined

	function get_video_id(index: number): string {
		return video_ids[index % video_ids.length] ?? video_ids[0] ?? ''
	}

	function update_progress(): void {
		if (!player || !is_player_ready) return
		if (player.getPlayerState() !== YT.PlayerState.PLAYING) return

		const total = player.getDuration()

		if (total > 0) {
			progress = player.getCurrentTime() / total
		}
	}

	function get_effective_volume(target: YT.Player): number {
		return target.isMuted() ? 0 : target.getVolume()
	}

	function detect_and_save_volume_change(): void {
		if (!player || !is_player_ready) return
		const effective_volume = get_effective_volume(player)
		if (effective_volume_previous === effective_volume) return
		effective_volume_previous = effective_volume
		volume_preference.save_level(effective_volume)
	}

	function tick(): void {
		update_progress()
		detect_and_save_volume_change()
	}

	function load_video(index: number): void {
		player?.loadVideoById(get_video_id(index))
	}

	function handle_state_change(event: YT.PlayerStateEvent): void {
		if (event.data !== YT.PlayerState.ENDED) return

		const next_index = (current_index + 1) % video_ids.length
		current_index = next_index
		progress = 0
		load_video(next_index)
	}

	function apply_saved_volume(target: YT.Player): void {
		const saved_level = volume_preference.load_level()
		target.setVolume(saved_level)
		if (saved_level > 0) target.unMute()
	}

	function handle_is_player_ready(event: YT.PlayerReadyEvent): void {
		is_player_ready = true
		last_loaded_index = current_index
		on_load_ready?.(load_video)
		load_video(current_index)
		event.target.playVideo()
		apply_saved_volume(event.target)
	}

	/* eslint-disable @typescript-eslint/naming-convention */
	function make_player_options(): YT.PlayerOptions {
		return {
			videoId: get_video_id(0),
			width: '100%',
			height: '100%',
			playerVars: {
				autoplay: 1,
				controls: 1,
				fs: 0,
				rel: 0,
				modestbranding: 1,
				playsinline: 1,
				iv_load_policy: IV_LOAD_POLICY_ANNOTATIONS_OFF,
				mute: 1,
			},
			events: {
				onReady: handle_is_player_ready,
				onStateChange: handle_state_change,
			},
		}
	}
	/* eslint-enable @typescript-eslint/naming-convention */

	function init_player(): void {
		const yt_api = globalThis.YT

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!yt_api) return

		player = new yt_api.Player(PLAYER_ELEMENT_ID, make_player_options())
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
		// appendChild used to avoid type conflict with Cloudflare worker-configuration.d.ts Element.append
		// eslint-disable-next-line unicorn/prefer-dom-node-append
		document.head.appendChild(script)
	}

	$effect(() => {
		if (!player || !is_player_ready) return
		if (last_loaded_index === current_index) return
		last_loaded_index = current_index
		load_video(current_index)
	})

	onMount(() => {
		load_youtube_api()
		const interval = setInterval(tick, PROGRESS_INTERVAL_MS)

		return function (): void {
			clearInterval(interval)
			player?.destroy()
		}
	})
</script>

<div id={PLAYER_ELEMENT_ID} class="video-container h-full w-full"></div>

<style>
	.video-container :global(iframe) {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
