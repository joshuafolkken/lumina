<script lang="ts">
	import { EXTERNAL_LINK_ATTRS } from '$lib/constants/app'
	import type { BrandLogo } from '$lib/constants/brand-logos'
	import { SIGNAGE_OVERLAY_FILL } from '$lib/constants/signage'
	import { brand_logo } from '$lib/utils/brand-logo'

	interface Props {
		brand: BrandLogo
		scale_value: number | undefined
		link_class: string
		img_class: string
		has_hover_overlay?: boolean
	}

	const { brand, scale_value, link_class, img_class, has_hover_overlay = false }: Props = $props()
</script>

<a href={brand.lineup_url ?? brand.url} {...EXTERNAL_LINK_ATTRS} class={link_class}>
	{#if has_hover_overlay}
		<div
			class="relative flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110"
		>
			<img
				src={brand.src}
				alt={brand.name}
				class={img_class}
				class:brand-invert={brand.invert}
				style:transform={brand_logo.format_scale(scale_value)}
				loading="lazy"
			/>
		</div>
		<div
			class="{SIGNAGE_OVERLAY_FILL} bg-linear-to-tr from-white/0 via-white/40 to-white/0 opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-100"
		></div>
	{:else}
		<img
			src={brand.src}
			alt={brand.name}
			class={img_class}
			class:brand-invert={brand.invert}
			style:transform={brand_logo.format_scale(scale_value)}
		/>
	{/if}
</a>
