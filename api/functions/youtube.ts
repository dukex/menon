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

interface YoutubePagination<T> {
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: T[];
}
interface YoutubePlaylistItemItem {
  kind: "youtube#playlistItem";
  etag: string;
  id: string;
  duration?: number;
  snippet: {
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
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
  };
  contentDetails: {
    videoId: string;
    startAt: string;
    endAt: string;
    note: string;
    videoPublishedAt: string;
  };
  status: {
    privacyStatus: string;
  };
}
