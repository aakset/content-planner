import { posts } from '#lib/server/db.js';

// Vorübergehender Verbindungstest (AP1). Wird in AP5 durch das Dashboard ersetzt.
export async function load() {
	try {
		const anzahl = await posts().countDocuments();
		return { verbunden: true, anzahl, fehler: '' };
	} catch (err) {
		console.error('Datenbankfehler:', err);
		const fehler =
			err instanceof Error && err.message.startsWith('DB_URI fehlt')
				? err.message
				: 'Prüfe DB_URI und die Netzwerk-Freigabe in MongoDB Atlas.';
		return { verbunden: false, anzahl: 0, fehler };
	}
}
