<script>
	/**
	 * Initialen einer Person im farbigen Kreis.
	 * @type {{ person: import('#lib/config.js').Person, gross?: boolean }}
	 */
	let { person, gross = false } = $props();
</script>

<span class="avatar" class:gross style:background={person.farbe} title={person.name}>
	{person.initialen}
</span>

<style>
	.avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		color: var(--c-weiss);
		font-size: 0.7rem;
		font-weight: 600;
	}

	.gross {
		width: 3.5rem;
		height: 3.5rem;
		font-size: 1.2rem;
	}
</style>
