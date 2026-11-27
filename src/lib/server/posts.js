import { ObjectId } from 'mongodb';
import { posts } from './db.js';

/**
 * Ein Post, wie ihn die Seiten bekommen (mit `id` als Text statt MongoDB-`_id`).
 * Datum, Uhrzeit, Zuständig und Plattform sind bei Ideen leer.
 * @typedef {object} Post
 * @property {string} id
 * @property {string} titel
 * @property {string} kategorie
 * @property {string} notiz
 * @property {string} status  idee | in_arbeit | geplant | veroeffentlicht
 * @property {string} datum  JJJJ-MM-TT oder leer
 * @property {string} uhrzeit  HH:MM oder leer
 * @property {string} zustaendig  ID einer Person aus config.js oder leer
 * @property {string} plattform  instagram | tiktok oder leer
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
		datum: doc.datum ?? '',
		uhrzeit: doc.uhrzeit ?? '',
		zustaendig: doc.zustaendig ?? '',
		plattform: doc.plattform ?? '',
		erstelltVon: doc.erstelltVon,
		erstelltAm: doc.erstelltAm
	};
}

/**
 * Wandelt eine ID aus der Adresse in eine MongoDB-ObjectId um.
 * Gibt `null` zurück, wenn die ID kein gültiges Format hat.
 * @param {string} id
 */
function zuObjectId(id) {
	return ObjectId.isValid(id) ? new ObjectId(id) : null;
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
 * Ein einzelner Post oder `null`, wenn es ihn nicht gibt.
 * @param {string} id
 * @returns {Promise<Post | null>}
 */
export async function postLaden(id) {
	const _id = zuObjectId(id);
	if (!_id) return null;
	const doc = await posts().findOne({ _id });
	return doc ? zuPost(doc) : null;
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

/**
 * Ändert einen bestehenden Post (Einplanen oder Bearbeiten).
 * @param {string} id
 * @param {import('./pruefung.js').PostWerte} werte  bereits geprüfte Werte
 * @returns {Promise<boolean>} `false`, wenn es den Post nicht gibt
 */
export async function postSpeichern(id, werte) {
	const _id = zuObjectId(id);
	if (!_id) return false;
	const ergebnis = await posts().updateOne(
		{ _id },
		{
			$set: {
				titel: werte.titel,
				kategorie: werte.kategorie,
				notiz: werte.notiz,
				status: werte.status,
				datum: werte.datum,
				uhrzeit: werte.uhrzeit,
				zustaendig: werte.zustaendig,
				plattform: werte.plattform
			}
		}
	);
	return ergebnis.matchedCount === 1;
}

/**
 * Löscht einen Post endgültig.
 * @param {string} id
 */
export async function postLoeschen(id) {
	const _id = zuObjectId(id);
	if (!_id) return;
	await posts().deleteOne({ _id });
}
