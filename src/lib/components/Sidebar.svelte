<script>
	import { page } from '$app/state';
	import Avatar from '#lib/components/Avatar.svelte';
	import { AKTUELLE_PERSON, TEAM_NAME } from '#lib/config.js';

	const links = [
		{ href: '/', text: 'Dashboard' },
		{ href: '/board', text: 'Ideen-Board' }
	];

	/**
	 * Ist der Link die aktuelle Seite? Das Dashboard nur bei genau «/».
	 * @param {string} href
	 */
	function istAktiv(href) {
		const pfad = page.url.pathname;
		return href === '/' ? pfad === '/' : pfad.startsWith(href);
	}
</script>

<aside class="sidebar">
	<a class="logo" href="/">Planer</a>

	<div class="team">
		<span class="team-label">Team</span>
		<span>{TEAM_NAME}</span>
	</div>

	<nav aria-label="Hauptnavigation">
		{#each links as link (link.href)}
			<a href={link.href} class:aktiv={istAktiv(link.href)} aria-current={istAktiv(link.href) ? 'page' : undefined}>
				{link.text}
			</a>
		{/each}
	</nav>

	<a class="knopf knopf-gelb neu" href="/ideen/neu">+ Idee notieren</a>

	<div class="person">
		<Avatar person={AKTUELLE_PERSON} gross />
		<span>{AKTUELLE_PERSON.name}</span>
	</div>
</aside>

<style>
	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem 1.5rem 1.5rem;
		background: var(--c-dunkel);
		color: var(--c-weiss);
	}

	.logo {
		font-family: var(--font-heading);
		font-weight: 800;
		font-size: 1.4rem;
		text-decoration: none;
	}

	.team {
		display: flex;
		flex-direction: column;
		padding: 0.6rem 0.8rem;
		border-radius: var(--radius);
		background: var(--c-dunkel-aktiv);
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	nav a {
		padding: 0.6rem 0.8rem;
		border-radius: var(--radius);
		color: rgb(255 255 255 / 0.75);
		text-decoration: none;
	}

	nav a:hover {
		color: var(--c-weiss);
	}

	nav a.aktiv {
		background: var(--c-dunkel-aktiv);
		color: var(--c-weiss);
	}

	/* Knopf und Person nach unten schieben */
	.neu {
		margin-top: auto;
	}

	.person {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding-top: 1rem;
		border-top: 1px solid var(--c-rand);
	}

	/* Schmale Fenster: Seitenleiste wird zur Leiste oben */
	@media (max-width: 800px) {
		.sidebar {
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			padding: 1rem;
		}

		.team,
		.person {
			display: none;
		}

		nav {
			flex-direction: row;
		}

		.neu {
			margin-top: 0;
			margin-left: auto;
		}
	}
</style>
