/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-magic-numbers, unicorn/prevent-abbreviations, no-var */
// Third-party YouTube IFrame API type declarations

declare namespace YT {
	const PlayerState: {
		readonly ENDED: 0
		readonly PLAYING: 1
		readonly PAUSED: 2
		readonly BUFFERING: 3
		readonly CUED: 5
		readonly UNSTARTED: -1
	}

	class Player {
		constructor(element: string | HTMLElement, options: PlayerOptions)

		loadVideoById(video_id: string): void

		seekTo(seconds: number, allow_seek_ahead: boolean): void

		getCurrentTime(): number

		getDuration(): number

		getPlayerState(): number

		playVideo(): void

		mute(): void

		unMute(): void

		isMuted(): boolean

		getVolume(): number

		setVolume(volume: number): void

		destroy(): void
	}

	interface PlayerOptions {
		videoId?: string
		width?: number | string
		height?: number | string
		playerVars?: PlayerVars
		events?: PlayerEvents
	}

	interface PlayerVars {
		autoplay?: 0 | 1
		controls?: 0 | 1
		fs?: 0 | 1
		rel?: 0 | 1
		modestbranding?: 0 | 1
		playsinline?: 0 | 1
		iv_load_policy?: 1 | 3
		mute?: 0 | 1
	}

	interface PlayerEvents {
		onReady?: (event: PlayerReadyEvent) => void
		onStateChange?: (event: PlayerStateEvent) => void
	}

	interface PlayerReadyEvent {
		target: Player
	}

	interface PlayerStateEvent {
		target: Player
		data: number
	}
}

declare var YT:
	| {
			Player: new (element: string | HTMLElement, options: YT.PlayerOptions) => YT.Player
	  }
	| undefined

declare var onYouTubeIframeAPIReady: (() => void) | undefined
