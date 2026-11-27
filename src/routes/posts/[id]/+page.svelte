<script>
	import { enhance } from '$app/forms';
	import ChipAuswahl from '#lib/components/ChipAuswahl.svelte';
	import Meldung from '#lib/components/Meldung.svelte';
	import { AKTUELLE_PERSON, KATEGORIEN, PERSONEN, PLATTFORMEN, STATUS } from '#lib/config.js';

	/** @type {import('./$types').PageProps} */
	let { data, form } = $props();

	const istIdee = $derived(data.post.status === 'idee');

	// Nach einem Fehler die eingegebenen Werte zeigen, sonst die gespeicherten.
	// Beim Einplanen einer Idee sind «In Arbeit» und die aktuelle Person vorgewählt.
	const werte = $derived(
		form?.werte ?? {
			...data.post,
			status: istIdee ? 'in_arbeit' : data.post.status,
			zustaendig: data.post.zustaendig || AKTUELLE_PERSON.id
		}
	);
	const fehler = $derived(form?.fehler ?? {});

	/** @type {import('$app/forms').SubmitFunction} */
	function fragenVorLoeschen({ cancel }) {
		if (!confirm('Willst du diesen Post wirklich löschen?')) {
			cancel();
		}
	}
</script>

<svelte:head>
	<title>{istIdee ? 'Post einplanen' : 'Post bearbeiten'} · Planer</title>
</svelte:head>

<h1>{istIdee ? 'Post einplanen' : 'Post bearbeiten'}</h1>

{#if fehler.allgemein}
	<Meldung art="fehler">{fehler.allgemein}</Meldung>
{/if}

<div class="rahmen">
	<!-- novalidate: die Prüfung macht der Server, damit überall dieselben Meldungen erscheinen -->
	<form method="POST" action="?/speichern" use:enhance novalidate>
		<div class="feld">
			<label for="titel">Titel des Posts</label>
			<input
				id="titel"
				name="titel"
				maxlength="100"
				value={werte.titel}
				aria-invalid={fehler.titel ? 'true' : undefined}
				aria-describedby={fehler.titel ? 'titel-fehler' : undefined}
			/>
			{#if fehler.titel}<p class="feld-fehler" id="titel-fehler">{fehler.titel}</p>{/if}
		</div>

		<div class="zwei-spalten">
			<div class="feld">
				<label for="datum">Datum</label>
				<input
					id="datum"
					name="datum"
					type="date"
					value={werte.datum}
					aria-invalid={fehler.datum ? 'true' : undefined}
					aria-describedby={fehler.datum ? 'datum-fehler' : undefined}
				/>
				{#if fehler.datum}<p class="feld-fehler" id="datum-fehler">{fehler.datum}</p>{/if}
			</div>
			<div class="feld">
				<label for="uhrzeit">Uhrzeit</label>
				<input
					id="uhrzeit"
					name="uhrzeit"
					type="time"
					value={werte.uhrzeit}
					aria-invalid={fehler.uhrzeit ? 'true' : undefined}
					aria-describedby={fehler.uhrzeit ? 'uhrzeit-fehler' : undefined}
				/>
				{#if fehler.uhrzeit}<p class="feld-fehler" id="uhrzeit-fehler">{fehler.uhrzeit}</p>{/if}
			</div>
		</div>

		<div class="feld">
			<label for="zustaendig">Zuständig</label>
			<select
				id="zustaendig"
				name="zustaendig"
				value={werte.zustaendig}
				aria-invalid={fehler.zustaendig ? 'true' : undefined}
				aria-describedby={fehler.zustaendig ? 'zustaendig-fehler' : undefined}
			>
				<option value="">–</option>
				{#each PERSONEN as person (person.id)}
					<option value={person.id}>{person.name}</option>
				{/each}
			</select>
			{#if fehler.zustaendig}<p class="feld-fehler" id="zustaendig-fehler">{fehler.zustaendig}</p>{/if}
		</div>

		<div class="feld">
			<ChipAuswahl name="plattform" legende="Plattform" optionen={PLATTFORMEN} gewaehlt={werte.plattform} fehler={fehler.plattform} />
		</div>

		<div class="feld">
			<ChipAuswahl name="status" legende="Status" optionen={STATUS} gewaehlt={werte.status} fehler={fehler.status} />
		</div>

		<div class="feld">
			<label for="kategorie">Kategorie</label>
			<select
				id="kategorie"
				name="kategorie"
				value={werte.kategorie}
				aria-invalid={fehler.kategorie ? 'true' : undefined}
				aria-describedby={fehler.kategorie ? 'kategorie-fehler' : undefined}
			>
				<option value="">–</option>
				{#each KATEGORIEN as kategorie (kategorie)}
					<option value={kategorie}>{kategorie}</option>
				{/each}
			</select>
			{#if fehler.kategorie}<p class="feld-fehler" id="kategorie-fehler">{fehler.kategorie}</p>{/if}
		</div>

		<div class="feld">
			<label for="notiz">Notiz (optional)</label>
			<textarea
				id="notiz"
				name="notiz"
				rows="3"
				maxlength="500"
				value={werte.notiz}
				aria-invalid={fehler.notiz ? 'true' : undefined}
				aria-describedby={fehler.notiz ? 'notiz-fehler' : undefined}
			></textarea>
			{#if fehler.notiz}<p class="feld-fehler" id="notiz-fehler">{fehler.notiz}</p>{/if}
		</div>

		<div class="aktionen">
			<button class="knopf" type="submit">{istIdee ? 'Post einplanen' : 'Änderungen speichern'}</button>
			<a href="/board">Abbrechen</a>
		</div>
	</form>

	<!-- Eigenes Formular, damit «Löschen» nicht die Felder oben mitschickt -->
	<form method="POST" action="?/loeschen" use:enhance={fragenVorLoeschen} class="loeschen">
		<button class="knopf knopf-hell" type="submit">Löschen</button>
	</form>
</div>

<style>
	.rahmen {
		max-width: 32rem;
		padding: 1.5rem;
		border: 1px solid var(--c-text);
		border-radius: var(--radius-gross);
	}

	.feld {
		margin-bottom: 1.2rem;
	}

	.zwei-spalten {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
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

	.loeschen {
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--c-rand);
	}

	.loeschen .knopf {
		border-color: var(--c-fehler);
		color: var(--c-fehler);
	}
</style>
