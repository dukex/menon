import slugify from "../../../helpers/slugify";

interface Env {
	YOUTUBE_API_KEY: string;
	DATABASE: D1Database;
}

interface RequestBody {
	provider: string;
	source: string;
}

interface CourseImported {
	id: string;
	slug: string;
}

interface Course extends CourseImported {
	provider_uid: string;
	provider_id: string;
	name: string;
	description: string;
	creator_name: string;
	thumbnail_url: string;
	published_at: string;
	source_url: string;
}

async function importCourse(
	body: RequestBody,
	apiKey: string,
	database: D1Database
): Promise<CourseImported> {
	const id = body.source.split("list=")[1];

	const stmt = database
		.prepare(
			"SELECT id, slug FROM courses WHERE provider_id=?1 AND provider_uid=?2"
		)
		.bind(id, body.provider);
	const alreadyExistentCourse = await stmt.first<CourseImported | null>();

	if (alreadyExistentCourse) {
		return alreadyExistentCourse;
	}

	const url = `https://www.googleapis.com/youtube/v3/playlists?id=${id}&key=${apiKey}&part=snippet,id,status`;

	const youtubeResponse = await fetch(url).then((r) =>
		r.json<YoutubePlaylistList>()
	);
	const playlistItem = youtubeResponse.items[0];

	const thumbnailUrl = () =>
		[
			playlistItem.snippet.thumbnails.maxres,
			playlistItem.snippet.thumbnails.standard,
			playlistItem.snippet.thumbnails.high,
			playlistItem.snippet.thumbnails.medium,
			playlistItem.snippet.thumbnails.default,
		].find((thumb) => thumb && thumb.url && thumb.url.length > 0).url;

	const course = {
		id: crypto.randomUUID(),
		provider_uid: "youtube-playlist",
		provider_id: id,
		slug: slugify(playlistItem.snippet.title),
		name: playlistItem.snippet.title,
		description: playlistItem.snippet.description,
		creator_name: playlistItem.snippet.channelTitle,
		thumbnail_url: thumbnailUrl(),
		published_at: playlistItem.snippet.publishedAt,
		source_url: body.source,
	};

	await database
		.prepare(
			"INSERT INTO courses (id, provider_uid, provider_id, slug, name, description, creator_name, thumbnail_url, published_at, source_url) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)"
		)
		.bind(...Object.values(course))
		.run();

	return { id: course.id, slug: course.slug };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
	const body = await context.request.json<RequestBody>();

	const course = await importCourse(
		body,
		context.env.YOUTUBE_API_KEY,
		context.env.DATABASE
	);

	const responseBody = { ...body, ...course };

	const response = new Response(JSON.stringify(responseBody), {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Max-Age": "86400",
			"Content-Type": "application/json",
		},
	});

	return response;
};

export const onRequestOptions: PagesFunction = async () => {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Max-Age": "86400",
		},
	});
};
