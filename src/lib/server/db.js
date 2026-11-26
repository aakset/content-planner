import { MongoClient } from 'mongodb';
import { DB_URI } from '$app/env/private';

const DB_NAME = 'content_planner';

/** @type {MongoClient | undefined} */
let client;

/**
 * Gibt die Datenbank zurück. Der Client wird beim ersten Aufruf erstellt und danach
 * wiederverwendet; die Verbindung baut der Treiber selbst auf, sobald sie gebraucht wird.
 */
function getDb() {
	if (!DB_URI) {
		throw new Error('DB_URI fehlt. Trag die Verbindungsadresse lokal in .env bzw. online in Netlify ein.');
	}
	// Nach 5 Sekunden aufgeben statt 30 (Netlify-Funktionen haben nur 10 Sekunden Zeit).
	client ??= new MongoClient(DB_URI, { serverSelectionTimeoutMS: 5000 });
	return client.db(DB_NAME);
}

/** Die Collection mit allen Ideen und Posts. */
export function posts() {
	return getDb().collection('posts');
}
