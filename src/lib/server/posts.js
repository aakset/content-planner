import { posts } from './db.js';

/**
 * Ein Post, wie ihn die Seiten bekommen (mit `id` als Text statt MongoDB-`_id`).
 * @typedef {object} Post
 * @property {string} id
 * @property {string} titel
 * @property {string} kategorie
 * @property {string} notiz
 * @property {string} status  idee | in_arbeit | geplant | veroeffentlicht
 * @property {string} erstelltVon  ID einer Person aus config.js
 * @property {Date} erstelltAm
 */

/**
 * Wandelt ein MongoDB-Dokument in einen Post für die Seiten um.
 * @param {import('mongodb').WithId<import('mongodb').Document>} doc
 * @returns {Post}
 */
function zuPost(doc) {
	return {
		id: doc._id.toString(),
		titel: doc.titel,
		kategorie: doc.kategorie,
		notiz: doc.notiz ?? '',
		status: doc.status,
		erstelltVon: doc.erstelltVon,
		erstelltAm: doc.erstelltAm
	};
}

/**
 * Alle Posts, die neuesten zuerst.
 * @returns {Promise<Post[]>}
 */
export async function allePosts() {
	const docs = await posts().find().sort({ erstelltAm: -1 }).toArray();
	return docs.map(zuPost);
}

/**
 * Speichert eine neue Idee (Status «idee», noch ohne Datum).
 * @param {{ titel: string, kategorie: string, notiz: string, erstelltVon: string }} idee
 * @returns {Promise<string>} die ID der neuen Idee
 */
export async function ideeErstellen(idee) {
	const ergebnis = await posts().insertOne({
		titel: idee.titel,
		kategorie: idee.kategorie,
		notiz: idee.notiz,
		status: 'idee',
		erstelltVon: idee.erstelltVon,
		erstelltAm: new Date()
	});
	return ergebnis.insertedId.toString();
}
