<script>
	import { findePerson } from '#lib/config.js';
	import { erstelltText } from '#lib/datum.js';

	/**
	 * Gelbe Karte für eine Idee im Board.
	 * @type {{ post: import('#lib/server/posts.js').Post }}
	 */
	let { post } = $props();

	// Nur der Vorname, wie im Mockup («von Lea»)
	const von = $derived(findePerson(post.erstelltVon)?.name.split(' ')[0] ?? 'unbekannt');
</script>

<article class="karte">
	<h3>{post.titel}</h3>
	<p class="meta">{post.kategorie}, von {von}, {erstelltText(post.erstelltAm)}</p>
</article>

<style>
	.karte {
		padding: 0.9rem 1rem;
		border-radius: var(--radius-gross);
		background: var(--c-gelb);
	}

	h3 {
		margin: 0 0 0.2rem;
		font-family: var(--font-body);
		font-size: 1rem;
		font-weight: 500;
	}

	.meta {
		margin: 0;
		font-size: 0.85rem;
		color: var(--c-text-grau);
	}
</style>
