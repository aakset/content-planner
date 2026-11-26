import { error } from '@sveltejs/kit';
import { allePosts } from '#lib/server/posts.js';
import { STATUS } from '#lib/config.js';

export async function load({ url }) {
	try {
		const posts = await allePosts();

		// Eine Spalte pro Status, in der Reihenfolge des Workflows
		const spalten = STATUS.map((status) => ({
			id: status.id,
			titel: status.spalte,
			posts: posts.filter((post) => post.status === status.id)
		}));

		// ?neu=1 setzt das Formular «Idee notieren» nach dem Speichern
		return { spalten, neu: url.searchParams.has('neu') };
	} catch (err) {
		console.error('Board laden fehlgeschlagen:', err);
		error(503, 'Das Board konnte nicht geladen werden. Versuch es später nochmals.');
	}
}
