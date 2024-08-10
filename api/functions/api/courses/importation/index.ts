import slugify from "../../../helpers/slugify";

interface Env {
	YOUTUBE_API_KEY;  
  DATABASE: D1Database  
}

interface RequestBody {
	provider: string;
	source: string;
}

interface YoutubePlaylistItemStatus {
	privacyStatus: string;
}

interface YoutubeThumbnails {
	url: string;
	width: number;
	height: number;
}

interface YoutubePlaylistItemSnippet {
	publishedAt: string;
	channelId: string;
	title: string;
	description: string;
	thumbnails: {
		default: YoutubeThumbnails;
		medium: YoutubeThumbnails;
		high: YoutubeThumbnails;
		standard?: YoutubeThumbnails;
		maxres?: YoutubeThumbnails;
	};
	channelTitle: string;
	localized: {
		title: string;
		description: string;
	};
}

interface YoutubePlaylistItem {
	id: string;
	status?: YoutubePlaylistItemStatus;
	snippet?: YoutubePlaylistItemSnippet;
}

interface YoutubePlaylistList {
	items: YoutubePlaylistItem[];
}

async function importCourse(body: RequestBody, apiKey: any) {
	const id = body.source.split("list=")[1];
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

	return {
		provider: "youtube-playlist",
		slug: slugify(playlistItem.snippet.title),
		name: playlistItem.snippet.title,
		description: playlistItem.snippet.description,
		creator_name: playlistItem.snippet.channelTitle,
		thumbnail_url: thumbnailUrl(),
		published_at: "2021-09-14T18:09:14Z",
		source_url: body.source,
	};
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
	const body = await context.request.json<RequestBody>();

	const course = await importCourse(body, context.env.YOUTUBE_API_KEY);

	const responseBody = { c: body, ...course };

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
