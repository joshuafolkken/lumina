<script lang="ts">
	import FullscreenButton from '$lib/components/Signage/FullscreenButton.svelte'
	import { CREDIT_LABEL, CREDIT_URL, EXTERNAL_LINK_ATTRS } from '$lib/constants/app'
	import { NAV_ITEMS, type AppRoute } from '$lib/constants/routes'
	import {
		SIGNAGE_GAP_ONE_VH,
		SIGNAGE_PANEL_BG,
		SIGNAGE_TEXT_MEDIUM,
		SIGNAGE_TEXT_SMALL,
	} from '$lib/constants/signage'

	interface Props {
		active_route: AppRoute
	}

	const { active_route }: Props = $props()

	function nav_link_class(href: AppRoute): string {
		return active_route === href
			? 'text-white transition-colors hover:underline'
			: 'transition-colors hover:text-white hover:underline'
	}
</script>

<div
	class="flex shrink-0 items-center justify-between {SIGNAGE_GAP_ONE_VH} {SIGNAGE_PANEL_BG} px-[1.5vh] py-[0.6vh]"
>
	<div
		class="flex items-center {SIGNAGE_GAP_ONE_VH} {SIGNAGE_TEXT_MEDIUM} font-bold tracking-wider text-white/40"
	>
		{#each NAV_ITEMS as item, index (item.route)}
			{#if index > 0}<span>|</span>{/if}
			<a href={item.route} class={nav_link_class(item.route)}>{item.label}</a>
		{/each}
	</div>

	<div class="flex items-center gap-[1.5vh]">
		<div class="min-w-0 text-right">
			<span class="{SIGNAGE_TEXT_SMALL} text-white/70">
				Powered by
				<a href={CREDIT_URL} {...EXTERNAL_LINK_ATTRS} class="text-white/70 hover:text-white">
					{CREDIT_LABEL}
				</a>
			</span>
			<span data-version={__APP_VERSION__} class="hidden">v{__APP_VERSION__}</span>
		</div>
		<FullscreenButton />
	</div>
</div>
