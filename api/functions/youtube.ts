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
