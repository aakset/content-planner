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
	<a class="einplanen" href="/posts/{post.id}">Einplanen</a>
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
		margin: 0 0 0.6rem;
		font-size: 0.85rem;
		color: var(--c-text-grau);
	}

	.einplanen {
		display: inline-block;
		padding: 0.25rem 0.9rem;
		border-radius: var(--radius);
		background: var(--c-weiss);
		font-size: 0.85rem;
		text-decoration: none;
	}

	.einplanen:hover {
		text-decoration: underline;
	}
</style>
