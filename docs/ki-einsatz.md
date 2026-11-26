# KI-Einsatz – Protokoll

Werkzeug: Claude Code (Desktop-App), Modell Claude Opus 5.5. Die Arbeitsregeln stehen in `AGENTS.md`.

## Übersicht pro Arbeitspaket

| Datum | Auftrag | Ergebnis | Probleme | Entscheidung Aakash |
| --- | --- | --- | --- | --- |
| 26.11.2026 | AP0 Setup: Repo sichten, Mockup lesen, Grundgerüst, Projekt- und Doku-Dateien anlegen, Arbeitspakete vorschlagen | Mockup (6 Seiten) gelesen und zusammengefasst; `.claude/settings.json`, `AGENTS.md`, `CLAUDE.md`, `docs/ki-einsatz.md`, `.env.example` angelegt; Vorschlag für Arbeitspakete und offene Fragen | `npx sv create` war schon gelaufen (nicht erneut ausgeführt); PDF-Mockup liess sich nicht direkt lesen; Aufgabenstellung und README-Vorlage fehlen im Repo | Arbeitspakete AP1–AP7 freigegeben; alle Empfehlungen zu F1–F8 angenommen (siehe `AGENTS.md`, Abschnitt «Entscheidungen»); Schriften noch offen |
| 26.11.2026 | AP1 Deployment & DB: Netlify-Adapter, MongoDB-Treiber, DB-Verbindung, Verbindungstest auf der Startseite | `adapter-netlify` statt `adapter-auto`, `netlify.toml`, `src/env.js`, `src/lib/server/db.js`, Startseite zeigt Verbindungsstatus; Check und Build ohne Fehler; ohne `.env` erscheint die verständliche Meldung | Plan nahm die alte Env-API (`$env/dynamic/private`) an, die es in SvelteKit 3 nicht mehr gibt; `@types/node` fehlte; `svelte-check` ohne vorheriges sync meldete falsche Fehler; Dev-Server liess sich über die Vorschau der App nicht starten | Plan freigegeben; Browser-Test lokal und auf Netlify bestanden («Datenbank verbunden: 0 Posts») |

## Situationen

### Gut gelaufen

- **Mockup trotz fehlendem PDF-Werkzeug gelesen (26.11.2026):** Das Lese-Werkzeug der KI konnte das PDF nicht direkt als Bild öffnen (es fehlte `poppler`). Statt nachzufragen oder etwas zu installieren, hat die KI die Seiten mit einem kurzen Swift-Skript über das macOS-eigene PDFKit in Bilder umgewandelt (in einem temporären Ordner, nicht im Repo) und danach alle 6 Seiten ausgewertet.

### Nicht gut gelaufen / korrigiert

- **Veraltetes Wissen im freigegebenen Plan (AP1, 26.11.2026):** Im Plan stand, `DB_URI` werde über `$env/dynamic/private` gelesen. So war es in SvelteKit 2. Beim Umsetzen zeigte sich, dass SvelteKit 3 das umgebaut hat: Variablen werden in `src/env.js` mit `defineEnvVars` deklariert und aus `$app/env/private` importiert. Die KI hat nicht geraten, sondern die Typdefinitionen und den Quellcode von SvelteKit im Projekt gelesen und danach umgesetzt. Lehre: Bei einer neuen Hauptversion die API im installierten Paket prüfen, bevor man sie in einen Plan schreibt.
- **Falsche Fehlermeldungen von `svelte-check` (AP1):** Direkt nach dem Schreiben meldete `npx svelte-check` fünf Fehler, u. a. fehlende Typen für `data` und `DB_URI`. Ursache: Die Typen erzeugt erst `svelte-kit sync`. Danach blieb ein echter Fehler: `@types/node` fehlte, deshalb verstand TypeScript die Optionen des MongoDB-Treibers nicht. Reaktion: `@types/node` installiert und in `AGENTS.md` die Prüfregel auf `npm run check` (sync + svelte-check) geändert.
- **Dev-Server über die Vorschau startete nicht (AP1):** Der Server-Start über das Browser-Panel der App lieferte keine Antwort und keine Logs. Die KI hat den Dev-Server dann direkt im Terminal gestartet und die Seite per `curl` geprüft. Der Code war in Ordnung.
- **Falsche Annahme im Auftrag erkannt (26.11.2026):** Laut Auftrag sollte die KI das Grundgerüst mit `npx sv create` anlegen. Beim Sichten zeigte sich, dass das schon im ersten Commit passiert war (minimal, JSDoc, npm; die Standard-README von `sv` nennt den Befehl). Die KI hat den Befehl deshalb nicht erneut ausgeführt, damit nichts überschrieben wird, und das gemeldet.

## Kleine technische Entscheidungen der KI

- **AP1:** `DB_URI` ist in `src/env.js` als optional deklariert, damit Build und Dev-Server auch ohne `.env` laufen; fehlt der Wert, meldet `db.js` das verständlich auf der Seite.
- **AP1:** Der MongoDB-Client wird einmal erstellt und wiederverwendet. `serverSelectionTimeoutMS` steht auf 5 s statt 30 s, weil Netlify-Funktionen nach 10 s abbrechen.
- **AP1:** Rohe Datenbankfehler werden nur in der Server-Konsole ausgegeben, auf der Seite steht ein allgemeiner Hinweis (keine Details zur Verbindung im Browser).
- **AP1:** Datenbankname `content_planner`, Collection `posts`.
- **AP1:** `netlify.toml` legt Node 24 fest (wie lokal). `@types/node@24` als Entwicklungs-Abhängigkeit (nur Typen, kein Laufzeitcode).
- **AP1:** `<html lang="de-CH">` in `src/app.html`.
- **AP1:** npm hat das Installationsskript von `fsevents` (optionaler Datei-Beobachter für macOS) blockiert. Das ist harmlos, deshalb nichts geändert.
- **AP0:** `.claude/settings.json` sperrt `Read(./.env)` und `Read(./.env.*)`. Damit ist auch `.env.example` für die KI gesperrt; das ist gewollt, die Datei enthält nur einen Platzhalter, den die KI selbst geschrieben hat.
- **AP0:** `.env.example` enthält nur `DB_URI` mit Platzhaltern. Der Datenbankname steht im Code (`src/lib/server/db.js`).
- **AP0:** `.svelte-kit/` und `node_modules/` sind schon über `.gitignore` ausgeschlossen; nichts geändert.
