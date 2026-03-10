<script lang="ts">
	import ThumbnailItem from './ThumbnailItem.svelte'

	interface Props {
		video_ids: ReadonlyArray<string>
		current_index: number
		progress: number
		on_select: (index: number) => void
		on_seek: (delta_pixels: number) => void
	}

	const { video_ids, current_index, progress, on_select, on_seek }: Props = $props()

	function make_select_handler(item_index: number): () => void {
		return function (): void {
			on_select(item_index)
		}
	}
</script>

<div class="flex h-36 shrink-0 flex-row gap-2 overflow-x-auto overflow-y-hidden bg-gray-900 p-2">
	{#each video_ids as video_id, index (video_id)}
		<ThumbnailItem
			{video_id}
			is_active={index === current_index}
			progress={index === current_index ? progress : 0}
			on_select={make_select_handler(index)}
			{on_seek}
		/>
	{/each}
</div>
