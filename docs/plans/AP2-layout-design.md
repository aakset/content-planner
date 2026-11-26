# AP2 – Layout & Design

Freigegeben von Aakash am 26.11.2026.

## Ziel

Jede Seite hat das Grundgerüst aus dem Mockup: dunkle Seitenleiste links, Inhalt rechts. Farben und Grundstile liegen zentral, damit AP3–AP6 sie nur noch verwenden.

## Schritte

1. `src/app.css` (global): Farben als CSS-Variablen (aus dem Mockup gemessen), Schriften, Grundstile für Text, Knöpfe, Eingabefelder, sichtbarer Fokus.
   - Dunkel `#262F40`, Gelb `#FDF3C4`, Instagram `#E26F8F`, TikTok `#54AB8F`, In Arbeit `#E59E40`, Geplant `#54AA6F`, Tag-Spalte `#F7F8F9`, heute `#ECF2F7`, Avatare `#F14D67` / `#2C6FF7` / `#67C553`.
2. `src/lib/config.js`: fest eingestellte Person (Lea Mustermann), Personenliste mit Initialen und Farbe, Teamname «TV Musterhausen», Plattformen, Kategorien, Status mit Anzeigetext.
3. Komponenten in `src/lib/components/`:
   - `Sidebar.svelte`: «Planer», Team-Box (ohne Dropdown), Navigation Dashboard / Ideen-Board mit aktiver Seite, gelber Knopf «+ Idee notieren», unten Avatar und Name.
   - `Avatar.svelte`: Initialen im farbigen Kreis, zwei Grössen.
4. `+layout.svelte`: Seitenleiste und Inhalt nebeneinander; in schmalen Fenstern rutscht die Seitenleiste nach oben.
5. Platzhalterseiten `/board` und `/ideen/neu` (nur Titel), damit die Links funktionieren. AP3 füllt sie.
6. Prüfen, committen, pushen, Doku.

## Offen

- **Schriften (F9):** Aakash hat AP2 ohne Schriftnamen freigegeben. Vorläufig Systemschrift; beide Schriften liegen in je einer CSS-Variable (`--font-heading`, `--font-body`) und werden ersetzt, sobald die Namen aus Figma bekannt sind.

## Browser-Test

1. Seitenleiste sieht aus wie im Mockup, aktive Seite ist markiert.
2. «+ Idee notieren» und «Ideen-Board» öffnen die Platzhalterseiten.
3. Im schmalen Fenster bricht das Layout nicht.
