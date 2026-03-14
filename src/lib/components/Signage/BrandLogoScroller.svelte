<script lang="ts">
	import BrandLogoLink from '$lib/components/Signage/BrandLogoLink.svelte'
	import { BRAND_LOGOS, type BrandLogo } from '$lib/constants/brand-logos'
	import {
		SCROLL_DURATION_S,
		SCROLL_FADE_OPACITY_START,
		SCROLL_FADE_WIDTH_VH,
		SCROLL_ITEM_WIDTH_VH,
		SCROLL_LOGO_MAX_HEIGHT_VH,
		SCROLL_LOGO_REPEAT_COUNT,
		SCROLL_PANEL_HEIGHT_VH,
		SCROLL_PANEL_SHADOW_OPACITY,
	} from '$lib/constants/signage'
	import { PERCENT } from '$lib/constants/ui'
	import { brand_logo } from '$lib/utils/brand-logo'

	const logos: ReadonlyArray<BrandLogo> = brand_logo.repeat_for_scroller(
		BRAND_LOGOS,
		SCROLL_LOGO_REPEAT_COUNT,
	)
	const scroll_translate_percent = PERCENT / SCROLL_LOGO_REPEAT_COUNT
</script>

<div
	class="logo-panel"
	style:--panel-height-vh={SCROLL_PANEL_HEIGHT_VH}
	style:--fade-width-vh={SCROLL_FADE_WIDTH_VH}
	style:--fade-opacity-start={SCROLL_FADE_OPACITY_START}
	style:--shadow-opacity={SCROLL_PANEL_SHADOW_OPACITY}
	style:--item-width-vh={SCROLL_ITEM_WIDTH_VH}
	style:--logo-max-height-vh={SCROLL_LOGO_MAX_HEIGHT_VH}
	style:--scroll-duration-s={SCROLL_DURATION_S}
	style:--scroll-translate-percent={scroll_translate_percent}
>
	<div class="logo-track">
		{#each logos as logo, index (index)}
			<BrandLogoLink
				brand={logo}
				scale_value={logo.scale}
				link_class="logo-item"
				img_class="logo-img"
			/>
		{/each}
	</div>
</div>

<style>
	.logo-panel {
		width: 100%;
		height: calc(var(--panel-height-vh, 14) * 1vh);
		display: flex;
		flex-direction: row;
		flex-shrink: 0;
		overflow: hidden;
		background-color: white;
		position: relative;
		box-shadow: 0 -6px 24px rgba(0, 0, 0, var(--shadow-opacity, 0.12));
		border-top: 1px solid #e0e0e0;
	}

	.logo-panel::before,
	.logo-panel::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		width: calc(var(--fade-width-vh, 14) * 1vh);
		z-index: 1;
		pointer-events: none;
	}

	.logo-panel::before {
		left: 0;
		background: linear-gradient(
			to right,
			white calc(var(--fade-opacity-start, 30) * 1%),
			transparent
		);
	}

	.logo-panel::after {
		right: 0;
		background: linear-gradient(
			to left,
			white calc(var(--fade-opacity-start, 30) * 1%),
			transparent
		);
	}

	.logo-track {
		display: flex;
		flex-direction: row;
		animation: scroll-left calc(var(--scroll-duration-s, 32) * 1s) linear infinite;
		align-items: center;
	}

	.logo-panel:hover .logo-track {
		animation-play-state: paused;
	}

	.logo-track :global(.logo-item) {
		padding: 1vh 2vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: calc(var(--item-width-vh, 16) * 1vh);
		transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.logo-track :global(.logo-item:hover) {
		transform: scale(1.12);
	}

	.logo-track :global(.logo-img) {
		width: 100%;
		height: auto;
		max-height: calc(var(--logo-max-height-vh, 8) * 1vh);
		object-fit: contain;
	}

	@keyframes scroll-left {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-1% * var(--scroll-translate-percent, 33.333)));
		}
	}
</style>
