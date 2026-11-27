import { error } from '@sveltejs/kit';
import { allePosts } from '#lib/server/posts.js';
import { STATUS } from '#lib/config.js';

// Erfolgsmeldungen nach dem Speichern/Löschen (?meldung=… in der Adresse)
/** @type {Record<string, string>} */
const MELDUNGEN = {
	neu: 'Idee notiert.',
	gespeichert: 'Post gespeichert.',
	geloescht: 'Post gelöscht.'
};

export async function load({ url }) {
	let posts;
	try {
		posts = await allePosts();
	} catch (err) {
		console.error('Board laden fehlgeschlagen:', err);
		error(503, 'Das Board konnte nicht geladen werden. Versuch es später nochmals.');
	}

	// Eine Spalte pro Status, in der Reihenfolge des Workflows.
	// Ideen: neueste zuerst (so kommen sie aus der DB). Übrige: nach Datum und Uhrzeit.
	const spalten = STATUS.map((status) => {
		const inSpalte = posts.filter((post) => post.status === status.id);
		if (status.id !== 'idee') {
			inSpalte.sort((a, b) => `${a.datum} ${a.uhrzeit}`.localeCompare(`${b.datum} ${b.uhrzeit}`));
		}
		return { id: status.id, titel: status.spalte, posts: inSpalte };
	});

	const meldung = MELDUNGEN[url.searchParams.get('meldung') ?? ''] ?? '';
	return { spalten, meldung };
}
