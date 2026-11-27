<script>
	import Avatar from '#lib/components/Avatar.svelte';
	import { findePerson, PLATTFORMEN } from '#lib/config.js';
	import { kurzDatum } from '#lib/datum.js';

	/**
	 * Karte für einen eingeplanten Post. Der farbige Streifen links zeigt die Plattform.
	 * Ein Klick öffnet die Bearbeiten-Seite.
	 * @type {{ post: import('#lib/server/posts.js').Post }}
	 */
	let { post } = $props();

	const plattform = $derived(PLATTFORMEN.find((p) => p.id === post.plattform));
	const person = $derived(findePerson(post.zustaendig));
</script>

<a
	class="karte"
	class:instagram={post.plattform === 'instagram'}
	class:tiktok={post.plattform === 'tiktok'}
	class:veroeffentlicht={post.status === 'veroeffentlicht'}
	href="/posts/{post.id}"
>
	<div class="inhalt">
		<span class="plattform">{plattform?.name ?? ''}</span>
		<span class="titel">{post.titel}</span>
		<span class="datum">{kurzDatum(post.datum)}</span>
	</div>
	{#if person}
		<Avatar {person} />
	{/if}
</a>

<style>
	.karte {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
		padding: 0.7rem 0.8rem 0.7rem 1rem;
		border-left: 6px solid var(--c-rand);
		border-radius: var(--radius-gross);
		background: var(--c-weiss);
		text-decoration: none;
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.06);
	}

	.karte:hover {
		box-shadow: 0 2px 6px rgb(0 0 0 / 0.12);
	}

	.instagram {
		border-left-color: var(--c-instagram);
	}

	.tiktok {
		border-left-color: var(--c-tiktok);
	}

	/* Veröffentlichte Posts blasser, wie im Mockup */
	.veroeffentlicht {
		opacity: 0.6;
	}

	.inhalt {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		min-width: 0;
	}

	.plattform,
	.datum {
		font-size: 0.75rem;
		color: var(--c-text-grau);
	}

	.titel {
		font-weight: 500;
	}
</style>
