<script>
	import BoardSpalte from '#lib/components/BoardSpalte.svelte';
	import IdeaCard from '#lib/components/IdeaCard.svelte';
	import PostCard from '#lib/components/PostCard.svelte';
	import Meldung from '#lib/components/Meldung.svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<svelte:head>
	<title>Ideen-Board · Planer</title>
</svelte:head>

<h1>Ideen-Board</h1>

{#if data.meldung}
	<Meldung art="erfolg">{data.meldung}</Meldung>
{/if}

<div class="board">
	{#each data.spalten as spalte (spalte.id)}
		<BoardSpalte titel={spalte.titel} anzahl={spalte.posts.length}>
			{#each spalte.posts as post (post.id)}
				{#if post.status === 'idee'}
					<IdeaCard {post} />
				{:else}
					<PostCard {post} />
				{/if}
			{/each}
		</BoardSpalte>
	{/each}
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(4, minmax(14rem, 1fr));
		gap: 1rem;
		/* Bei wenig Platz scrollt nur das Board seitlich, nicht die ganze Seite */
		overflow-x: auto;
		padding-bottom: 0.5rem;
	}
</style>
