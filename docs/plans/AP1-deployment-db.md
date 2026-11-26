# AP1 – Deployment & Datenbank

Freigegeben von Aakash am 26.11.2026.

## Ziel

Die (noch leere) App läuft lokal und auf Netlify und kann MongoDB erreichen. Deployment-Probleme sollen früh auffallen, nicht erst am Schluss.

## Schritte (KI)

1. Pakete: `mongodb` und `@sveltejs/adapter-netlify` installieren, `adapter-auto` entfernen. Adapter in `vite.config.js` eintragen. Kleine `netlify.toml` mit Build-Befehl und Ausgabeordner.
2. DB-Verbindung in `src/lib/server/db.js`: liest `DB_URI` über `$env/dynamic/private` (landet nicht im Build), liefert Datenbank `content_planner` und Collection `posts`. Verständliche Fehlermeldung, wenn `DB_URI` fehlt.
3. Vorübergehender Verbindungstest: Startseite lädt serverseitig die Anzahl Posts und zeigt «Datenbank verbunden: 0 Posts» oder eine Fehlermeldung. Wird in AP5 durch das Dashboard ersetzt.
4. Prüfen (`svelte-check`, Build), committen, pushen.
5. Doku: AGENTS.md (Deployment, Struktur), Protokoll-Eintrag.

## Schritte (Aakash)

1. MongoDB Atlas: Datenbankbenutzer, Network Access `0.0.0.0/0`, Verbindungsadresse kopieren.
2. Lokal `.env` mit `DB_URI=…` anlegen.
3. Netlify: Projekt aus GitHub importieren, Umgebungsvariable `DB_URI` setzen, deployen.

## Browser-Test

1. Lokal (`npm run dev`) zeigt die Startseite «Datenbank verbunden».
2. Die Netlify-URL zeigt dasselbe.
