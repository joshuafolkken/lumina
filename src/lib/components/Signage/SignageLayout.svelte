<script lang="ts">
	import AppFooter from '$lib/components/Signage/AppFooter.svelte'
	import type { AppRoute } from '$lib/constants/routes'
	import type { Snippet } from 'svelte'

	interface Props {
		active_route: AppRoute
		main_class?: string
		children: Snippet
	}

	const { active_route, main_class = '', children }: Props = $props()

	const base_class = 'flex w-full flex-col overflow-hidden bg-black'
	const resolved_class = $derived(main_class ? `${base_class} ${main_class}`.trim() : base_class)
</script>

<main class={resolved_class}>
	{@render children()}
	<AppFooter {active_route} />
</main>
