<script lang="ts">
	import BrandLogoScroller from '$lib/components/Signage/BrandLogoScroller.svelte'
	import SignageLayout from '$lib/components/Signage/SignageLayout.svelte'
	import Timeline from '$lib/components/Signage/Timeline.svelte'
	import YoutubePlayer from '$lib/components/Signage/YoutubePlayer.svelte'
	import { APP_NAME } from '$lib/constants/app'
	import { ROUTES } from '$lib/constants/routes'
	import { LAYOUT_FILL, LAYOUT_FLEX_COL_FILL, LAYOUT_FLEX_ROW_FILL } from '$lib/constants/signage'
	import { VIDEO_IDS } from '$lib/constants/video-ids'

	let current_index = $state(0)
	let progress = $state(0)
	// eslint-disable-next-line init-declarations
	let load_video: ((index: number) => void) | undefined

	function switch_to_video(index: number): void {
		current_index = index
		progress = 0
		load_video?.(index)
	}
</script>

<h1 class="sr-only">{APP_NAME}</h1>
<SignageLayout active_route={ROUTES.HOME} main_class="signage-root">
	<div class="{LAYOUT_FLEX_COL_FILL} gap-[2px]">
		<div class={LAYOUT_FLEX_ROW_FILL}>
			<div class={LAYOUT_FILL}>
				<YoutubePlayer
					video_ids={VIDEO_IDS}
					bind:current_index
					bind:progress
					on_load_ready={(load: (index: number) => void) => {
						load_video = load
					}}
				/>
			</div>
			<Timeline video_ids={VIDEO_IDS} {current_index} {progress} on_select={switch_to_video} />
		</div>
		<BrandLogoScroller />
	</div>
</SignageLayout>
