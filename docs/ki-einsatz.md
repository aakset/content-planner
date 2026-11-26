# KI-Einsatz – Protokoll

Werkzeug: Claude Code (Desktop-App), Modell Claude Opus 5.5. Die Arbeitsregeln stehen in `AGENTS.md`.

## Übersicht pro Arbeitspaket

| Datum | Auftrag | Ergebnis | Probleme | Entscheidung Aakash |
| --- | --- | --- | --- | --- |
| 26.11.2026 | AP0 Setup: Repo sichten, Mockup lesen, Grundgerüst, Projekt- und Doku-Dateien anlegen, Arbeitspakete vorschlagen | Mockup (6 Seiten) gelesen und zusammengefasst; `.claude/settings.json`, `AGENTS.md`, `CLAUDE.md`, `docs/ki-einsatz.md`, `.env.example` angelegt; Vorschlag für Arbeitspakete und offene Fragen | `npx sv create` war schon gelaufen (nicht erneut ausgeführt); PDF-Mockup liess sich nicht direkt lesen; Aufgabenstellung und README-Vorlage fehlen im Repo | Arbeitspakete AP1–AP7 freigegeben; alle Empfehlungen zu F1–F8 angenommen (siehe `AGENTS.md`, Abschnitt «Entscheidungen»); Schriften noch offen |
| 26.11.2026 | AP1 Deployment & DB: Netlify-Adapter, MongoDB-Treiber, DB-Verbindung, Verbindungstest auf der Startseite | `adapter-netlify` statt `adapter-auto`, `netlify.toml`, `src/env.js`, `src/lib/server/db.js`, Startseite zeigt Verbindungsstatus; Check und Build ohne Fehler; ohne `.env` erscheint die verständliche Meldung | Plan nahm die alte Env-API (`$env/dynamic/private`) an, die es in SvelteKit 3 nicht mehr gibt; `@types/node` fehlte; `svelte-check` ohne vorheriges sync meldete falsche Fehler; Dev-Server liess sich über die Vorschau der App nicht starten | Plan freigegeben; Browser-Test lokal und auf Netlify bestanden («Datenbank verbunden: 0 Posts») |
| 26.11.2026 | AP2 Layout & Design: Farben, Grundstile, feste Werte, Seitenleiste, Avatar, Layout, Platzhalterseiten | `app.css` mit Mockup-Farben, `config.js`, `Sidebar.svelte`, `Avatar.svelte`, Layout mit Umbruch für schmale Fenster; Check und Build ohne Fehler; im Browser geprüft (Desktop und 375 px) | Schriftnamen nicht im PDF (Figma exportiert Text als Umrisse); Freigabe kam ohne Schriftnamen | Plan freigegeben; Schriften vorläufig Systemschrift (F9 offen); Browser-Test durch Aakash bestanden |

## Situationen

### Gut gelaufen

- **Mockup trotz fehlendem PDF-Werkzeug gelesen (26.11.2026):** Das Lese-Werkzeug der KI konnte das PDF nicht direkt als Bild öffnen (es fehlte `poppler`). Statt nachzufragen oder etwas zu installieren, hat die KI die Seiten mit einem kurzen Swift-Skript über das macOS-eigene PDFKit in Bilder umgewandelt (in einem temporären Ordner, nicht im Repo) und danach alle 6 Seiten ausgewertet.

- **Farben exakt aus dem Mockup gemessen (AP2, 26.11.2026):** Statt Farben zu schätzen, hat die KI das PDF gerendert und die Pixelfarben an bestimmten Stellen ausgelesen (Seitenleiste, Ideen-Karten, Plattform-Streifen, Statuspunkte, Avatare). Die ersten Messpunkte lagen teils auf Schrift oder Leerraum; die KI hat sie nachgemessen.
- **Nicht blockiert trotz offener Frage (AP2):** Aakash hat AP2 freigegeben, aber die Schriften (F9) nicht beantwortet. Die KI hat mit der Systemschrift weitergebaut und die Schriften so in zwei CSS-Variablen gelegt, dass sie später an einer Stelle ersetzt werden können. Die Frage hat sie erneut gestellt.

### Nicht gut gelaufen / korrigiert

- **Schriftnamen nicht aus dem PDF lesbar (AP2):** Die KI wollte die Schriftnamen aus dem PDF lesen, damit Aakash nicht nachschauen muss. Figma hatte den Text aber als Umrisse exportiert («FigmaGlyphs»), es gibt keine Schriftnamen im PDF. Die Frage ging deshalb an Aakash zurück.

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
- **AP2:** Personen ohne Nachnamen (Tim, Sara, Oli) haben einen Buchstaben als Initiale. Oli hat eine Avatar-Farbe, die nicht im Mockup vorkommt (Violett `#8B5CF6`).
- **AP2:** Der Dropdown-Pfeil der Team-Box ist weggelassen, weil es noch keine Teams zum Wechseln gibt.
- **AP2:** Unter 800 px Breite wird die Seitenleiste zur Leiste oben; Team-Box und Person sind dort ausgeblendet.
- **AP2:** Die aktive Seite ist mit `aria-current="page"` markiert (für Screenreader), der Tastaturfokus ist sichtbar.
- **AP0:** `.claude/settings.json` sperrt `Read(./.env)` und `Read(./.env.*)`. Damit ist auch `.env.example` für die KI gesperrt; das ist gewollt, die Datei enthält nur einen Platzhalter, den die KI selbst geschrieben hat.
- **AP0:** `.env.example` enthält nur `DB_URI` mit Platzhaltern. Der Datenbankname steht im Code (`src/lib/server/db.js`).
- **AP0:** `.svelte-kit/` und `node_modules/` sind schon über `.gitignore` ausgeschlossen; nichts geändert.
