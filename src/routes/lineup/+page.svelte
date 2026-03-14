<script lang="ts">
	import BrandLogoLink from '$lib/components/Signage/BrandLogoLink.svelte'
	import DecorativeBlurOrbs from '$lib/components/Signage/DecorativeBlurOrbs.svelte'
	import SignageLayout from '$lib/components/Signage/SignageLayout.svelte'
	import { BRAND_LOGOS } from '$lib/constants/brand-logos'
	import { LINEUP_PAGE, ROUTES } from '$lib/constants/routes'
	import { LAYOUT_FILL, LAYOUT_FLEX_COL_FILL, LINEUP_CARD_LINK_CLASS } from '$lib/constants/signage'
</script>

<svelte:head>
	<title>{LINEUP_PAGE.TITLE}</title>
</svelte:head>

<SignageLayout active_route={ROUTES.LINEUP} main_class="h-dvh">
	<div class="relative {LAYOUT_FLEX_COL_FILL} bg-slate-900 px-[3vmin] pt-[3vmin] pb-[2vmin]">
		<DecorativeBlurOrbs />

		<div class="relative z-10 mb-[2vmin] shrink-0 text-center">
			<h1
				class="text-[5vmin] leading-tight font-extrabold tracking-tight text-white drop-shadow-md"
			>
				{LINEUP_PAGE.TITLE}
			</h1>
			<p class="mt-[0.5vmin] text-[2vmin] font-medium text-slate-300">
				{LINEUP_PAGE.SUBTITLE}
			</p>
		</div>

		<div
			class="relative z-10 grid {LAYOUT_FILL} gap-[2vmin]
				portrait:grid-cols-2 portrait:grid-rows-4
				landscape:grid-cols-4 landscape:grid-rows-2"
		>
			{#each BRAND_LOGOS as brand (brand.name)}
				<BrandLogoLink
					{brand}
					scale_value={brand.lineup_scale}
					link_class={LINEUP_CARD_LINK_CLASS}
					img_class="h-auto max-h-full w-full object-contain"
					has_hover_overlay
				/>
			{/each}
		</div>
	</div>
</SignageLayout>
