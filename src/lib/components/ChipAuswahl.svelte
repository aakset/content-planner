<script>
	/**
	 * Auswahl als «Chips» (wie im Mockup). Technisch Radio-Buttons:
	 * funktionieren ohne JavaScript und mit der Tastatur (Pfeiltasten).
	 * @type {{
	 *   name: string,
	 *   legende: string,
	 *   optionen: { id: string, name: string }[],
	 *   gewaehlt: string,
	 *   fehler?: string
	 * }}
	 */
	let { name, legende, optionen, gewaehlt, fehler } = $props();
</script>

<!-- aria-describedby verknüpft die Fehlermeldung für Screenreader mit der ganzen Gruppe -->
<fieldset class:ungueltig={fehler} aria-describedby={fehler ? `${name}-fehler` : undefined}>
	<legend>{legende}</legend>
	<div class="chips">
		{#each optionen as option (option.id)}
			<label class="chip">
				<input
					type="radio"
					{name}
					value={option.id}
					checked={gewaehlt === option.id}
				/>
				<span>{option.name}</span>
			</label>
		{/each}
	</div>
	{#if fehler}
		<p class="feld-fehler" id="{name}-fehler">{fehler}</p>
	{/if}
</fieldset>

<style>
	fieldset {
		margin: 0;
		padding: 0;
		border: none;
	}

	legend {
		font-size: 0.9rem;
		margin-bottom: 0.35rem;
		padding: 0;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.chip {
		margin: 0;
		cursor: pointer;
	}

	/* Den runden Radio-Knopf unsichtbar machen, aber bedienbar lassen */
	.chip input {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
	}

	.chip span {
		display: inline-block;
		padding: 0.35rem 0.9rem;
		border: 1px solid var(--c-text);
		border-radius: var(--radius);
		background: var(--c-weiss);
	}

	.ungueltig .chip span {
		border-color: var(--c-fehler);
		border-width: 2px;
	}

	.chip input:checked + span {
		background: var(--c-dunkel);
		border-color: var(--c-dunkel);
		color: var(--c-weiss);
	}

	.chip input:focus-visible + span {
		outline: 2px solid var(--c-fokus);
		outline-offset: 2px;
	}

	.feld-fehler {
		margin: 0.3rem 0 0;
		color: var(--c-fehler);
		font-size: 0.9rem;
	}
</style>
