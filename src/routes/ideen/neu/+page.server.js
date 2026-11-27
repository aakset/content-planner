import { fail, redirect } from '@sveltejs/kit';
import { ideeErstellen } from '#lib/server/posts.js';
import { leseFormular, pruefeIdee } from '#lib/server/pruefung.js';
import { AKTUELLE_PERSON } from '#lib/config.js';

export const actions = {
	// Wird beim Absenden des Formulars auf dem Server ausgeführt.
	default: async ({ request }) => {
		const werte = leseFormular(await request.formData());

		// Serverseitige Prüfung: bei Fehlern Formular mit den eingegebenen Werten wieder anzeigen
		const fehler = pruefeIdee(werte);
		if (Object.keys(fehler).length > 0) {
			return fail(400, { werte, fehler });
		}

		try {
			await ideeErstellen({
				titel: werte.titel,
				kategorie: werte.kategorie,
				notiz: werte.notiz,
				erstelltVon: AKTUELLE_PERSON.id
			});
		} catch (err) {
			console.error('Idee speichern fehlgeschlagen:', err);
			fehler.allgemein = 'Die Idee konnte nicht gespeichert werden. Versuch es nochmals.';
			return fail(500, { werte, fehler });
		}

		// Erfolg: zum Board, dort erscheint «Idee notiert.»
		redirect(303, '/board?meldung=neu');
	}
};
