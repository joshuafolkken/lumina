<script lang="ts">
	import { page } from '$app/state'
	import { locales, localizeHref } from '$lib/paraglide/runtime'
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'

	const { children } = $props()
</script>

<svelte:head>
	<title>Lumina</title>
	<meta name="description" content="YouTube動画を自動再生するデジタルサイネージアプリ。" />
	<link rel="icon" href={favicon} />
</svelte:head>
<!-- eslint-disable-next-line @typescript-eslint/no-unsafe-call -- Svelte 5 snippet render -->
{@render children()}

<div style="display:none">
	{#each locales as locale (locale)}
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
