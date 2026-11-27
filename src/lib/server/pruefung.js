// Serverseitige Prüfung der Formulare «Idee notieren» und «Post einplanen/bearbeiten».
import { KATEGORIEN, PERSONEN, PLATTFORMEN, STATUS } from '#lib/config.js';

/**
 * Alle Felder eines Posts, wie sie aus dem Formular kommen (immer Text).
 * @typedef {object} PostWerte
 * @property {string} titel
 * @property {string} kategorie
 * @property {string} notiz
 * @property {string} status
 * @property {string} datum     JJJJ-MM-TT oder leer
 * @property {string} uhrzeit   HH:MM oder leer
 * @property {string} zustaendig
 * @property {string} plattform
 */

/**
 * Fehlermeldungen pro Feld; `allgemein` für Fehler, die zu keinem Feld gehören.
 * @typedef {Partial<Record<keyof PostWerte | 'allgemein', string>>} Fehler
 */

/**
 * Liest die Felder aus dem Formular. Fehlende Felder werden zu leerem Text.
 * @param {FormData} formData
 * @returns {PostWerte}
 */
export function leseFormular(formData) {
	/** @param {string} name */
	const text = (name) => String(formData.get(name) ?? '').trim();
	return {
		titel: text('titel'),
		kategorie: text('kategorie'),
		notiz: text('notiz'),
		status: text('status'),
		datum: text('datum'),
		uhrzeit: text('uhrzeit'),
		zustaendig: text('zustaendig'),
		plattform: text('plattform')
	};
}

/**
 * Prüft Titel, Kategorie und Notiz (gilt für Ideen und Posts).
 * @param {PostWerte} werte
 * @returns {Fehler}
 */
export function pruefeIdee(werte) {
	/** @type {Fehler} */
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
	return fehler;
}

/**
 * Prüft einen ganzen Post. Ab Status «In Arbeit» sind Datum, Uhrzeit,
 * Zuständig und Plattform Pflicht; bei «Idee» dürfen sie leer sein.
 * @param {PostWerte} werte
 * @returns {Fehler}
 */
export function pruefePost(werte) {
	const fehler = pruefeIdee(werte);
	const pflicht = werte.status !== 'idee';

	if (!STATUS.some((s) => s.id === werte.status)) {
		fehler.status = 'Wähle einen Status.';
	}
	if ((pflicht || werte.datum) && !istDatum(werte.datum)) {
		fehler.datum = 'Wähle ein Datum.';
	}
	if ((pflicht || werte.uhrzeit) && !/^([01]\d|2[0-3]):[0-5]\d$/.test(werte.uhrzeit)) {
		fehler.uhrzeit = 'Wähle eine Uhrzeit.';
	}
	if ((pflicht || werte.zustaendig) && !PERSONEN.some((p) => p.id === werte.zustaendig)) {
		fehler.zustaendig = 'Wähle, wer zuständig ist.';
	}
	if ((pflicht || werte.plattform) && !PLATTFORMEN.some((p) => p.id === werte.plattform)) {
		fehler.plattform = 'Wähle eine Plattform.';
	}
	return fehler;
}

/**
 * Ist der Text ein gültiges Datum im Format JJJJ-MM-TT (z. B. kein 31. Februar)?
 * @param {string} text
 */
function istDatum(text) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return false;
	const [jahr, monat, tag] = text.split('-').map(Number);
	const d = new Date(Date.UTC(jahr, monat - 1, tag));
	return d.getUTCFullYear() === jahr && d.getUTCMonth() === monat - 1 && d.getUTCDate() === tag;
}
