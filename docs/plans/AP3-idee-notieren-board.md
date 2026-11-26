# AP3 – Idee notieren & Ideen-Board

Freigegeben von Aakash am 26.11.2026.

## Ziel

Ideen erfassen, in MongoDB speichern und im Ideen-Board anzeigen. Erfüllt «Seite zum Erfassen» und «Übersichtsseite mit Daten aus MongoDB».

## Dokument in `posts`

| Feld | Wert |
| --- | --- |
| `titel` | Text, Pflicht, max. 100 Zeichen |
| `kategorie` | Event, Mitglieder, Sponsoring, Fun oder Werbung |
| `notiz` | Text, optional, max. 500 Zeichen |
| `status` | `idee` |
| `erstelltVon` | `lea` (fest eingestellte Person) |
| `erstelltAm` | Zeitpunkt des Speicherns |

Einplan-Felder (Datum, Uhrzeit, Zuständig, Plattform) folgen in AP4.

## Schritte

1. `src/lib/server/posts.js`: `ideeErstellen()`, `allePosts()`; `_id` wird zu Text umgewandelt.
2. `/ideen/neu`: Formular (Titel, Kategorie, Notiz), Form Action mit serverseitiger Prüfung, Fehler beim Feld, Werte bleiben erhalten; nach dem Speichern Weiterleitung zum Board mit Erfolgsmeldung; «Abbrechen».
3. `/board`: vier Spalten (Ideen, In Arbeit, Geplant, Veröffentlicht) mit Anzahl, neueste oben; gelbe Ideen-Karten mit «Kategorie, von Lea, heute». «Einplanen» erst in AP4.
4. Komponenten: `BoardSpalte.svelte`, `IdeaCard.svelte`, `Meldung.svelte`; Hilfsfunktion `src/lib/datum.js`.
5. Prüfen, committen, pushen, Doku.

## Sichtbare Texte

- Seitentitel «Idee notieren»; Felder «Titel», «Kategorie», «Notiz (optional)»; Platzhalter «z. B. Vorstellung neue Trainerin»
- Knöpfe «Idee speichern», «Abbrechen»
- Fehler: «Gib einen Titel ein.» · «Der Titel darf höchstens 100 Zeichen lang sein.» · «Wähle eine Kategorie.» · «Die Notiz darf höchstens 500 Zeichen lang sein.» · «Die Idee konnte nicht gespeichert werden. Versuch es nochmals.»
- Erfolg: «Idee notiert.»; leere Spalte: «Noch nichts hier.»

## Browser-Test

1. Idee mit Titel und Kategorie speichern → erscheint im Board unter «Ideen» mit «…, von Lea, heute».
2. Ohne Titel absenden → Fehlermeldung, Kategorie und Notiz bleiben ausgefüllt.
3. Nach dem Deploy funktioniert es auch auf Netlify.
