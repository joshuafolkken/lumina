<script lang="ts">
	import { BRAND_LOGOS, type BrandLogo } from '$lib/constants/brand-logos'

	const logos: ReadonlyArray<BrandLogo> = [...BRAND_LOGOS, ...BRAND_LOGOS]
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
		width: 10vw;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		overflow: hidden;
		background-color: white;
	}

	.logo-track {
		display: flex;
		flex-direction: column;
		animation: scroll-up 32s linear infinite;
	}

	.logo-panel:hover .logo-track {
		animation-play-state: paused;
	}

	.logo-item {
		padding: 1vw;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.2s ease-in-out;
	}

	.logo-item:hover {
		opacity: 0.7;
	}

	.logo-img {
		width: 100%;
		height: auto;
		max-height: 5vw;
		object-fit: contain;
	}

	@keyframes scroll-up {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-50%);
		}
	}
</style>
