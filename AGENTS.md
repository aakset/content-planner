# AGENTS.md – Content-Planer

Projektinfos und Arbeitsregeln für KI-Agenten (Claude Code u. a.). `CLAUDE.md` verweist nur auf diese Datei.

## Projekt

Prototyp für das Modul **Prototyping (ZHAW)**, Autor: Aakash Sethi.

**Content-Planer für kleine Social-Media-Teams** (z. B. ein Verein). Ideen für Posts werden gesammelt, für einen Tag eingeplant und bis «veröffentlicht» verfolgt. Plattformen: Instagram und TikTok.

- **Umfang Zwischenabgabe:** nur der Hauptworkflow: Idee notieren → einplanen (Datum, Uhrzeit, zuständige Person, Plattform) → in einer Wochenansicht sehen → Status bis «veröffentlicht» weiterschalten.
- **Später:** Login und Teams mit Einladungscode. Bis dahin ist eine Person fest eingestellt.
- **Pflicht laut Aufgabe:** mindestens eine Übersichtsseite mit Daten aus MongoDB, eine Seite zum Erfassen oder Bearbeiten, Komponenten, Git/GitHub, Deployment auf Netlify.
- **Design-Vorlage:** `Content-Planer Mockup.pdf` (Figma-Export, 6 Seiten: Login, Team beitreten/erstellen, Dashboard mit Wochenansicht, Dashboard mit Einplan-Formular, Dashboard mit Bestätigungs-Toast, Ideen-Board als Kanban).

## Stack

- SvelteKit 3 mit Svelte 5 (Runes-Modus ist in `vite.config.js` erzwungen)
- JavaScript mit JSDoc-Typen (`jsconfig.json`, `strict: true`)
- MongoDB-Node-Treiber (`mongodb`)
- Deployment: `@sveltejs/adapter-netlify` (in SvelteKit 3 wird der Adapter in `vite.config.js` konfiguriert)
- Datenbankverbindung über die Umgebungsvariable `DB_URI` (Vorlage: `.env.example`)
- Paketmanager: npm
- Import-Alias: `#lib` bzw. `#lib/*` (in `package.json` unter `imports` definiert)

## Struktur

```
src/
  app.html, app.d.ts
  lib/
    assets/          statische Assets (favicon)
    server/          ALLE Datenbankzugriffe (nur hier!)
    components/      wiederverwendbare Svelte-Komponenten
  routes/            Seiten und Form Actions
static/              Dateien, die 1:1 ausgeliefert werden
docs/
  ki-einsatz.md      Protokoll des KI-Einsatzes (nach jedem Arbeitspaket)
  plans/             freigegebene Arbeitspaket-Pläne (APx-name.md)
Content-Planer Mockup.pdf   Figma-Mockup (Design-Vorlage)
```

Ordner, die es noch nicht gibt, entstehen mit dem ersten Arbeitspaket, das sie braucht.

## Befehle

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklungsserver |
| `npx svelte-check` | Typ- und Svelte-Prüfung |
| `npm run build` | Produktions-Build (muss vor jedem Commit laufen) |
| `npm run preview` | Build lokal ansehen |

## Arbeitsregeln

1. **Selbständig:** Setup, Installationen, Code, Prüfungen, Commits und Pushes macht der Agent selbst. Was nur Aakash tun kann (DB_URI in `.env` eintragen, Netlify einrichten, Atlas freigeben), gibt der Agent als kurze Schritt-für-Schritt-Anleitung.
2. **Fragen statt raten:** Bei Design, Datenmodell, Umfang, sichtbaren Texten und neuen Bibliotheken fragt der Agent nach, mit 2 bis 3 Optionen und einer Empfehlung. Kleine technische Details entscheidet der Agent selbst und hält sie in `docs/ki-einsatz.md` fest.
3. **Arbeitspakete:** Jedes Arbeitspaket beginnt mit einem kurzen Plan, den Aakash freigibt, bevor Code geschrieben wird. Freigegebene Pläne liegen in `docs/plans/APx-name.md`.
4. **Prüfen:** Nach jedem Schritt `npx svelte-check` und `npm run build`. Am Ende jedes Arbeitspakets höchstens 3 Dinge nennen, die Aakash im Browser testen soll, und auf sein OK warten.
5. **Git:** Nach jedem funktionierenden Schritt committen und pushen. Kleine Commits mit kurzen deutschen Nachrichten, die sagen, was sich geändert hat.
6. **Sicherheit:** `.env` nie lesen oder ausgeben, keine Zugangsdaten in Dateien. `.claude/settings.json` verbietet `Read(./.env)` und `Read(./.env.*)`. Datenbankzugriffe nur in `src/lib/server/`.
7. **Code:** Form Actions mit serverseitiger Prüfung und verständlichen Fehler- und Erfolgsmeldungen. Texte in der App auf Deutsch (Schweiz, «ss» statt «ß»), Du-Form. Einfach halten, sodass Aakash den Code erklären kann.

## Dokumentation (laufend)

- **AGENTS.md** (diese Datei): aktualisieren, wenn sich Projektinfos, Struktur oder Regeln ändern.
- **docs/ki-einsatz.md:** nach jedem Arbeitspaket eine Zeile (Datum, Auftrag, Ergebnis, Probleme, Entscheidung von Aakash) und konkrete Situationen, in denen es gut oder schlecht lief. Ehrlich, auch bei Fehlern.
- **README.md** nach der Moodle-Vorlage: Kapitel 3.4 (Entwurf und Umsetzung) laufend aktuell halten; Kapitel 6 (KI-Deklaration) aus dem Protokoll entwerfen; was nur Aakash beurteilen kann, mit `[TODO Aakash]` markieren; übrige Kapitel als Vorlage stehen lassen.
- Alles über den Mindestumfang hinaus in der README als mögliche Erweiterung für Kapitel 4 notieren.
