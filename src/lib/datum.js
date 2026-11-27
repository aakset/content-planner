// Hilfsfunktionen für Datumsangaben.
// Alles wird in Schweizer Zeit gerechnet. Der Server auf Netlify läuft in UTC,
// sonst wäre «heute» kurz nach Mitternacht auf Server und Browser verschieden.

const ZEITZONE = 'Europe/Zurich';
const MONATE = ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'];

/**
 * Jahr, Monat (1–12) und Tag eines Zeitpunkts in Schweizer Zeit.
 * @param {Date} datum
 */
function tagInZuerich(datum) {
	// 'en-CA' liefert das Format JJJJ-MM-TT
	const text = new Intl.DateTimeFormat('en-CA', { timeZone: ZEITZONE }).format(datum);
	const [jahr, monat, tag] = text.split('-').map(Number);
	return { jahr, monat, tag };
}

const WOCHENTAGE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

/**
 * Kurzes Datum für Karten, z. B. «Fr, 27. Nov». Erwartet Text im Format JJJJ-MM-TT.
 * @param {string} datum
 */
export function kurzDatum(datum) {
	if (!datum) return '';
	const [jahr, monat, tag] = datum.split('-').map(Number);
	// Nur für den Wochentag; UTC, damit keine Zeitzone dazwischenfunkt
	const wochentag = WOCHENTAGE[new Date(Date.UTC(jahr, monat - 1, tag)).getUTCDay()];
	return `${wochentag}, ${tag}. ${MONATE[monat - 1]}`;
}

/**
 * Kurzangabe, wann etwas erstellt wurde: «heute», «gestern» oder z. B. «20. Nov».
 * @param {Date} datum
 * @param {Date} [jetzt]
 */
export function erstelltText(datum, jetzt = new Date()) {
	const d = tagInZuerich(datum);
	const h = tagInZuerich(jetzt);
	const tageDazwischen =
		(Date.UTC(h.jahr, h.monat - 1, h.tag) - Date.UTC(d.jahr, d.monat - 1, d.tag)) / 86_400_000;

	if (tageDazwischen === 0) return 'heute';
	if (tageDazwischen === 1) return 'gestern';
	return `${d.tag}. ${MONATE[d.monat - 1]}`;
}
