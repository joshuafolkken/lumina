<script lang="ts">
	import { BRAND_LOGOS, type BrandLogo } from '$lib/constants/brand-logos'

	const logos: ReadonlyArray<BrandLogo> = [...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS]
</script>

<div class="logo-panel">
	<div class="logo-track">
		{#each logos as logo, index (index)}
			<a href={logo.url} target="_blank" rel="noopener noreferrer" class="logo-item">
				<img
					src={logo.src}
					alt={logo.name}
					class="logo-img"
					class:invert={logo.invert}
					style:transform={logo.scale === undefined ? undefined : `scale(${String(logo.scale)})`}
				/>
			</a>
		{/each}
	</div>
</div>

<style>
	.logo-panel {
		width: 100%;
		height: 14vh;
		display: flex;
		flex-direction: row;
		flex-shrink: 0;
		overflow: hidden;
		background-color: white;
		position: relative;
		box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.12);
		border-top: 1px solid #e0e0e0;
	}

	.logo-panel::before,
	.logo-panel::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		width: 14vh;
		z-index: 1;
		pointer-events: none;
	}

	.logo-panel::before {
		left: 0;
		background: linear-gradient(to right, white 30%, transparent);
	}

	.logo-panel::after {
		right: 0;
		background: linear-gradient(to left, white 30%, transparent);
	}

	.logo-track {
		display: flex;
		flex-direction: row;
		animation: scroll-left 32s linear infinite;
		align-items: center;
	}

	.logo-panel:hover .logo-track {
		animation-play-state: paused;
	}

	.logo-item {
		padding: 1vh 2vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 16vh;
		transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.logo-item:hover {
		transform: scale(1.12);
	}

	.logo-img {
		width: 100%;
		height: auto;
		max-height: 8vh;
		object-fit: contain;
	}

	.logo-img.invert {
		filter: invert(1);
	}

	@keyframes scroll-left {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-33.333%);
		}
	}
</style>
