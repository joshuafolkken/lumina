<script lang="ts">
	import { ORB_BLUR_CLASS, ORB_SIZE_CLASS, SIGNAGE_OVERLAY_FILL } from '$lib/constants/signage'

	interface Orb {
		position_class: string
		color_class: string
	}

	const ORBS: ReadonlyArray<Orb> = [
		{ position_class: 'top-[-20%] left-[-10%]', color_class: 'bg-blue-500/10' },
		{ position_class: 'right-[-10%] bottom-[-20%]', color_class: 'bg-blue-300/10' },
	]
</script>

<div class="{SIGNAGE_OVERLAY_FILL} overflow-hidden">
	{#each ORBS as orb (orb.position_class)}
		<div
			class="absolute {ORB_SIZE_CLASS} rounded-full {ORB_BLUR_CLASS} {orb.position_class} {orb.color_class}"
		></div>
	{/each}
</div>
