# AP4 – Einplanen & Bearbeiten

Freigegeben von Aakash am 27.11.2026.

## Ziel

Aus einer Idee wird ein eingeplanter Post (Datum, Uhrzeit, zuständige Person, Plattform). Bestehende Posts lassen sich bearbeiten und löschen.

## Entscheidungen (Aakash, 27.11.2026)

- Status im Formular: alle 4 (Idee · In Arbeit · Geplant · Veröffentlicht).
- Datum und Uhrzeit als zwei Textfelder: `datum: "2026-11-27"`, `uhrzeit: "18:00"`.

## Neue Felder in `posts`

`datum`, `uhrzeit`, `zustaendig` (Personen-ID), `plattform` (`instagram` | `tiktok`). Bei «Idee» optional, ab «In Arbeit» Pflicht. Vergangene Daten erlaubt.

## Schritte

1. `posts.js`: `postLaden(id)`, `postSpeichern(id, felder)`, `postLoeschen(id)`.
2. Seite `/posts/[id]`: Formular wie Mockup S. 4 (Titel, Datum, Uhrzeit, Zuständig, Plattform-Chips, Status-Chips, Kategorie, Notiz); bei einer Idee ist «In Arbeit» vorgewählt. Form Actions `speichern` (serverseitige Prüfung, Werte bleiben) und `loeschen` (mit Rückfrage). Danach zum Board mit Meldung. Unbekannte ID → Fehlerseite.
3. Board: «Einplanen» auf Ideen-Karten; `PostCard.svelte` für die übrigen Spalten (Plattform-Streifen, Plattform, Titel, «Fr, 27. Nov», Avatar; veröffentlicht blasser; Klick öffnet Bearbeiten).
4. `ChipAuswahl.svelte` (Radio-Buttons als Chips), `kurzDatum()` in `datum.js`.
5. Prüfen, committen, pushen, Doku.

## Sichtbare Texte

- Seitentitel «Post einplanen» (Idee) bzw. «Post bearbeiten»
- Felder «Titel des Posts», «Datum», «Uhrzeit», «Zuständig», «Plattform», «Status», «Kategorie», «Notiz (optional)»
- Knöpfe «Post einplanen» / «Änderungen speichern», «Abbrechen», «Löschen», im Board «Einplanen»
- Rückfrage «Willst du diesen Post wirklich löschen?»
- Fehler wie AP3, dazu «Wähle ein Datum.» · «Wähle eine Uhrzeit.» · «Wähle, wer zuständig ist.» · «Wähle eine Plattform.» · «Wähle einen Status.» · «Der Post konnte nicht gespeichert werden. Versuch es nochmals.»
- Erfolg «Post gespeichert.» · «Post gelöscht.»; nicht gefunden «Diesen Post gibt es nicht.»

## Browser-Test

1. Idee → «Einplanen» → ausfüllen → Post unter «In Arbeit» mit Datum, Plattform-Streifen und Avatar.
2. «In Arbeit» ohne Datum speichern → Fehlermeldung, übrige Eingaben bleiben.
3. Test-Idee löschen → nach Rückfrage weg.
