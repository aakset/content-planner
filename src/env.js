import { defineEnvVars } from '@sveltejs/kit/env';

// Umgebungsvariablen der App (SvelteKit 3). Private Variablen sind nur auf dem Server
// über `$app/env/private` lesbar und landen nie im Browser.
export const variables = defineEnvVars({
	DB_URI: {
		description: 'Verbindungsadresse zu MongoDB Atlas (lokal in .env, online in Netlify)',
		// Optional, damit Build und Dev-Server auch ohne .env starten.
		// Fehlt der Wert, meldet src/lib/server/db.js das verständlich.
		schema: (value) => value || undefined
	}
});
