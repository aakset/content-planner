import { fail, redirect } from '@sveltejs/kit';
import { ideeErstellen } from '#lib/server/posts.js';
import { AKTUELLE_PERSON, KATEGORIEN } from '#lib/config.js';

export const actions = {
	// Wird beim Absenden des Formulars auf dem Server ausgeführt.
	default: async ({ request }) => {
		const formData = await request.formData();
		const werte = {
			titel: String(formData.get('titel') ?? '').trim(),
			kategorie: String(formData.get('kategorie') ?? ''),
			notiz: String(formData.get('notiz') ?? '').trim()
		};

		// Serverseitige Prüfung: Fehlermeldungen pro Feld sammeln
		/** @type {{ titel?: string, kategorie?: string, notiz?: string, allgemein?: string }} */
		const fehler = {};
		if (werte.titel === '') {
			fehler.titel = 'Gib einen Titel ein.';
		} else if (werte.titel.length > 100) {
			fehler.titel = 'Der Titel darf höchstens 100 Zeichen lang sein.';
		}
		if (!KATEGORIEN.includes(werte.kategorie)) {
			fehler.kategorie = 'Wähle eine Kategorie.';
		}
		if (werte.notiz.length > 500) {
			fehler.notiz = 'Die Notiz darf höchstens 500 Zeichen lang sein.';
		}

		// Bei Fehlern: Formular mit den eingegebenen Werten wieder anzeigen
		if (Object.keys(fehler).length > 0) {
			return fail(400, { werte, fehler });
		}

		try {
			await ideeErstellen({ ...werte, erstelltVon: AKTUELLE_PERSON.id });
		} catch (err) {
			console.error('Idee speichern fehlgeschlagen:', err);
			fehler.allgemein = 'Die Idee konnte nicht gespeichert werden. Versuch es nochmals.';
			return fail(500, { werte, fehler });
		}

		// Erfolg: zum Board, dort erscheint «Idee notiert.»
		redirect(303, '/board?neu=1');
	}
};
