<script>
	/**
	 * Erfolgs- oder Fehlermeldung über einem Inhalt.
	 * @type {{ art: 'erfolg' | 'fehler', children: import('svelte').Snippet }}
	 */
	let { art, children } = $props();
</script>

<!-- role="alert" lässt Screenreader Fehler sofort vorlesen, role="status" höflich -->
<p class="meldung {art}" role={art === 'fehler' ? 'alert' : 'status'}>
	{@render children()}
</p>

<style>
	.meldung {
		margin: 0 0 1.5rem;
		padding: 0.8rem 1rem;
		border-radius: var(--radius);
		font-weight: 600;
	}

	.erfolg {
		background: var(--c-dunkel);
		color: var(--c-weiss);
	}

	.erfolg::before {
		content: '✓ ';
	}

	.fehler {
		background: #fdecea;
		color: var(--c-fehler);
	}
</style>
