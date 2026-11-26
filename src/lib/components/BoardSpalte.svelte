<script>
	/**
	 * Eine Spalte im Ideen-Board mit Titel und Anzahl.
	 * @type {{ titel: string, anzahl: number, children: import('svelte').Snippet }}
	 */
	let { titel, anzahl, children } = $props();
</script>

<section class="spalte" aria-label={titel}>
	<header>
		<h2>{titel}</h2>
		<span class="anzahl">{anzahl}</span>
	</header>

	{#if anzahl === 0}
		<p class="leer">Noch nichts hier.</p>
	{:else}
		<div class="karten">
			{@render children()}
		</div>
	{/if}
</section>

<style>
	.spalte {
		padding: 1rem;
		border-radius: var(--radius-gross);
		background: var(--c-spalte);
		min-height: 60vh;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 1rem;
	}

	h2 {
		margin: 0;
		font-family: var(--font-body);
		font-size: 1.1rem;
		font-weight: 500;
	}

	.anzahl {
		font-size: 0.85rem;
		color: var(--c-text-grau);
	}

	.karten {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.leer {
		margin: 0;
		font-size: 0.9rem;
		color: var(--c-text-grau);
	}
</style>
