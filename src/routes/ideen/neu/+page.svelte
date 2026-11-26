<script>
	import { enhance } from '$app/forms';
	import Meldung from '#lib/components/Meldung.svelte';
	import { KATEGORIEN } from '#lib/config.js';

	/** @type {import('./$types').PageProps} */
	let { form } = $props();
</script>

<svelte:head>
	<title>Idee notieren · Planer</title>
</svelte:head>

<h1>Idee notieren</h1>

{#if form?.fehler?.allgemein}
	<Meldung art="fehler">{form.fehler.allgemein}</Meldung>
{/if}

<!-- novalidate: die Prüfung macht der Server, damit überall dieselben Meldungen erscheinen -->
<form method="POST" use:enhance novalidate>
	<div class="feld">
		<label for="titel">Titel</label>
		<input
			id="titel"
			name="titel"
			maxlength="100"
			placeholder="z. B. Vorstellung neue Trainerin"
			value={form?.werte?.titel ?? ''}
			aria-invalid={form?.fehler?.titel ? 'true' : undefined}
			aria-describedby={form?.fehler?.titel ? 'titel-fehler' : undefined}
		/>
		{#if form?.fehler?.titel}
			<p class="feld-fehler" id="titel-fehler">{form.fehler.titel}</p>
		{/if}
	</div>

	<div class="feld">
		<label for="kategorie">Kategorie</label>
		<select
			id="kategorie"
			name="kategorie"
			value={form?.werte?.kategorie ?? ''}
			aria-invalid={form?.fehler?.kategorie ? 'true' : undefined}
			aria-describedby={form?.fehler?.kategorie ? 'kategorie-fehler' : undefined}
		>
			<option value="">–</option>
			{#each KATEGORIEN as kategorie (kategorie)}
				<option value={kategorie}>{kategorie}</option>
			{/each}
		</select>
		{#if form?.fehler?.kategorie}
			<p class="feld-fehler" id="kategorie-fehler">{form.fehler.kategorie}</p>
		{/if}
	</div>

	<div class="feld">
		<label for="notiz">Notiz (optional)</label>
		<textarea
			id="notiz"
			name="notiz"
			rows="4"
			maxlength="500"
			value={form?.werte?.notiz ?? ''}
			aria-invalid={form?.fehler?.notiz ? 'true' : undefined}
			aria-describedby={form?.fehler?.notiz ? 'notiz-fehler' : undefined}
		></textarea>
		{#if form?.fehler?.notiz}
			<p class="feld-fehler" id="notiz-fehler">{form.fehler.notiz}</p>
		{/if}
	</div>

	<div class="aktionen">
		<button class="knopf" type="submit">Idee speichern</button>
		<a href="/board">Abbrechen</a>
	</div>
</form>

<style>
	form {
		max-width: 32rem;
		background: var(--c-gelb);
		padding: 1.5rem;
		border-radius: var(--radius-gross);
	}

	.feld {
		margin-bottom: 1.2rem;
	}

	.feld-fehler {
		margin: 0.3rem 0 0;
		color: var(--c-fehler);
		font-size: 0.9rem;
	}

	[aria-invalid='true'] {
		border-color: var(--c-fehler);
		border-width: 2px;
	}

	.aktionen {
		display: flex;
		align-items: center;
		gap: 1.2rem;
	}
</style>
