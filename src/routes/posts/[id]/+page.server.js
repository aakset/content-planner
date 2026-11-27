import { error, fail, redirect } from '@sveltejs/kit';
import { postLaden, postLoeschen, postSpeichern } from '#lib/server/posts.js';
import { leseFormular, pruefePost } from '#lib/server/pruefung.js';

export async function load({ params }) {
	let post;
	try {
		post = await postLaden(params.id);
	} catch (err) {
		console.error('Post laden fehlgeschlagen:', err);
		error(503, 'Der Post konnte nicht geladen werden. Versuch es später nochmals.');
	}
	if (!post) {
		error(404, 'Diesen Post gibt es nicht.');
	}
	return { post };
}

export const actions = {
	// Formular «Post einplanen» bzw. «Änderungen speichern»
	speichern: async ({ request, params }) => {
		const werte = leseFormular(await request.formData());

		// Serverseitige Prüfung: bei Fehlern Formular mit den eingegebenen Werten wieder anzeigen
		const fehler = pruefePost(werte);
		if (Object.keys(fehler).length > 0) {
			return fail(400, { werte, fehler });
		}

		let gefunden;
		try {
			gefunden = await postSpeichern(params.id, werte);
		} catch (err) {
			console.error('Post speichern fehlgeschlagen:', err);
			fehler.allgemein = 'Der Post konnte nicht gespeichert werden. Versuch es nochmals.';
			return fail(500, { werte, fehler });
		}
		if (!gefunden) {
			error(404, 'Diesen Post gibt es nicht.');
		}

		redirect(303, '/board?meldung=gespeichert');
	},

	// Knopf «Löschen» (die Rückfrage passiert vorher im Browser)
	loeschen: async ({ params }) => {
		try {
			await postLoeschen(params.id);
		} catch (err) {
			console.error('Post löschen fehlgeschlagen:', err);
			/** @type {import('#lib/server/pruefung.js').Fehler} */
			const fehler = { allgemein: 'Der Post konnte nicht gelöscht werden. Versuch es nochmals.' };
			return fail(500, { fehler });
		}
		redirect(303, '/board?meldung=geloescht');
	}
};
