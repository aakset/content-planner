// Feste Werte der App an einem Ort.
// Solange es kein Login und keine Teams gibt, sind Team und Personen hier fest eingetragen.

/**
 * @typedef {object} Person
 * @property {string} id
 * @property {string} name
 * @property {string} initialen
 * @property {string} farbe  Hintergrundfarbe des Avatars
 */

export const TEAM_NAME = 'TV Musterhausen';

/** @type {Person[]} */
export const PERSONEN = [
	{ id: 'lea', name: 'Lea Mustermann', initialen: 'LM', farbe: '#F14D67' },
	{ id: 'tim', name: 'Tim', initialen: 'T', farbe: '#2C6FF7' },
	{ id: 'sara', name: 'Sara', initialen: 'S', farbe: '#67C553' },
	{ id: 'oli', name: 'Oli', initialen: 'O', farbe: '#8B5CF6' }
];

/** Die fest eingestellte Person (ersetzt später das Login). */
export const AKTUELLE_PERSON = PERSONEN[0];

/**
 * Sucht eine Person anhand ihrer ID.
 * @param {string | null | undefined} id
 * @returns {Person | undefined}
 */
export function findePerson(id) {
	return PERSONEN.find((p) => p.id === id);
}

export const PLATTFORMEN = [
	{ id: 'instagram', name: 'Instagram' },
	{ id: 'tiktok', name: 'TikTok' }
];

export const KATEGORIEN = ['Event', 'Mitglieder', 'Sponsoring', 'Fun', 'Werbung'];

/** Status in der Reihenfolge des Workflows. `spalte` ist der Titel der Spalte im Ideen-Board. */
export const STATUS = [
	{ id: 'idee', name: 'Idee', spalte: 'Ideen' },
	{ id: 'in_arbeit', name: 'In Arbeit', spalte: 'In Arbeit' },
	{ id: 'geplant', name: 'Geplant', spalte: 'Geplant' },
	{ id: 'veroeffentlicht', name: 'Veröffentlicht', spalte: 'Veröffentlicht' }
];
