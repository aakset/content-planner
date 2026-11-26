# KI-Einsatz – Protokoll

Werkzeug: Claude Code (Desktop-App), Modell Claude Opus 5.5. Die Arbeitsregeln stehen in `AGENTS.md`.

## Übersicht pro Arbeitspaket

| Datum | Auftrag | Ergebnis | Probleme | Entscheidung Aakash |
| --- | --- | --- | --- | --- |
| 26.11.2026 | AP0 Setup: Repo sichten, Mockup lesen, Grundgerüst, Projekt- und Doku-Dateien anlegen, Arbeitspakete vorschlagen | Mockup (6 Seiten) gelesen und zusammengefasst; `.claude/settings.json`, `AGENTS.md`, `CLAUDE.md`, `docs/ki-einsatz.md`, `.env.example` angelegt; Vorschlag für Arbeitspakete und offene Fragen | `npx sv create` war schon gelaufen (nicht erneut ausgeführt); PDF-Mockup liess sich nicht direkt lesen; Aufgabenstellung und README-Vorlage fehlen im Repo | Arbeitspakete AP1–AP7 freigegeben; alle Empfehlungen zu F1–F8 angenommen (siehe `AGENTS.md`, Abschnitt «Entscheidungen»); Schriften noch offen |

## Situationen

### Gut gelaufen

- **Mockup trotz fehlendem PDF-Werkzeug gelesen (26.11.2026):** Das Lese-Werkzeug der KI konnte das PDF nicht direkt als Bild öffnen (es fehlte `poppler`). Statt nachzufragen oder etwas zu installieren, hat die KI die Seiten mit einem kurzen Swift-Skript über das macOS-eigene PDFKit in Bilder umgewandelt (in einem temporären Ordner, nicht im Repo) und danach alle 6 Seiten ausgewertet.

### Nicht gut gelaufen / korrigiert

- **Falsche Annahme im Auftrag erkannt (26.11.2026):** Laut Auftrag sollte die KI das Grundgerüst mit `npx sv create` anlegen. Beim Sichten zeigte sich, dass das schon im ersten Commit passiert war (minimal, JSDoc, npm; die Standard-README von `sv` nennt den Befehl). Die KI hat den Befehl deshalb nicht erneut ausgeführt, damit nichts überschrieben wird, und das gemeldet.

## Kleine technische Entscheidungen der KI

- `.claude/settings.json` sperrt `Read(./.env)` und `Read(./.env.*)`. Damit ist auch `.env.example` für die KI gesperrt; das ist gewollt, die Datei enthält nur einen Platzhalter, den die KI selbst geschrieben hat.
- `.env.example` enthält nur `DB_URI` mit Platzhaltern. Der Datenbankname wird im Code festgelegt (Entscheidung folgt im ersten Datenbank-Arbeitspaket).
- `.svelte-kit/` und `node_modules/` sind schon über `.gitignore` ausgeschlossen; nichts geändert.
