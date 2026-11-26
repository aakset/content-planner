<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<!-- Vorübergehender Verbindungstest (AP1). Wird in AP5 durch das Dashboard ersetzt. -->
<h1>Content-Planer</h1>

{#if data.verbunden}
	<p>Datenbank verbunden: {data.anzahl} Posts</p>
{:else}
	<p>Keine Verbindung zur Datenbank. {data.fehler}</p>
{/if}
