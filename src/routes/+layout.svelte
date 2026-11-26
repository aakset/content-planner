<script>
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import Sidebar from '#lib/components/Sidebar.svelte';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Planer</title>
</svelte:head>

<div class="app">
	<Sidebar />
	<main>
		{@render children()}
	</main>
</div>

<style>
	.app {
		display: grid;
		grid-template-columns: 260px 1fr;
		min-height: 100vh;
	}

	main {
		padding: 2.5rem 2rem;
		min-width: 0;
	}

	@media (max-width: 800px) {
		.app {
			grid-template-columns: 1fr;
			grid-template-rows: auto 1fr;
		}

		main {
			padding: 1.5rem 1rem;
		}
	}
</style>
