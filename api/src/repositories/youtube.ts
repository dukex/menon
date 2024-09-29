import { Temporal } from "temporal-polyfill";

export async function getPlaylist(
  id: string,
  key: string
): Promise<YoutubePlaylistItem> {
  const url = `https://www.googleapis.com/youtube/v3/playlists?id=${id}&key=${key}&part=snippet,id,status`;

  const youtubeResponse = (await fetch(url).then((r) =>
    r.json()
  )) as YoutubePlaylistList;

  const item = youtubeResponse.items[0];
  return item;
}

export async function getPlaylistItems(
  id: string,
  key: string
): Promise<YoutubePlaylistItemItem[]> {
  const items = (
    await listAll<YoutubePlaylistItemItem>(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        playlistId: id,
        key: key,
        part: "contentDetails,snippet,id,status",
      },
      async (items) => await enrichVideoList(items, key)
    )
  ).filter((i) => i.status.privacyStatus !== "private");

  return items;
}

async function enrichVideoList(items: YoutubePlaylistItemItem[], key: string) {
  const videosIds = items.map((i) => i.contentDetails.videoId);

  const url = "https://www.googleapis.com/youtube/v3/videos";

  const videos = await listAll<YoutubeVideo>(url, {
    id: videosIds.join(","),
    key: key,
    part: "contentDetails",
  });

  return items.map((i) => {
    const video = videos.find((v) => v.id === i.contentDetails.videoId)!;

    const duration = Temporal.Duration.from(video.contentDetails.duration);

    return { ...i, duration: duration.total("millisecond") };
  });
}

async function listAll<T>(
  url: string,
  params: Record<string, any>,
  enrich: (items: T[]) => Promise<T[]> = (i) => Promise.resolve(i),
  nextPageToken?: string | null
): Promise<T[]> {
  const fullUrl = [
    url,
    [
      ...Object.keys(params).map((k) => `${k}=${params[k]}`),
      ...[`pageToken=${nextPageToken || ""}`, "maxResults=51"],
    ].join("&"),
  ].join("?");

  console.log(fullUrl);

  const youtubeResponse = (await fetch(fullUrl).then((r) =>
    r.json()
  )) as YoutubePagination<T>;

  const enrichedItems = await enrich(youtubeResponse.items);

  if (youtubeResponse.nextPageToken) {
    const nextItems = await listAll<T>(
      url,
      params,
      enrich,
      youtubeResponse.nextPageToken
    );

    return [...enrichedItems, ...nextItems];
  }

  return enrichedItems;
}

interface YoutubePlaylistList {
  items: YoutubePlaylistItem[];
}

export interface YoutubePlaylistItemItem extends HasSnippetThumbnail {
  kind: "youtube#playlistItem";
  etag: string;
  id: string;
  duration?: number;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YoutubeSnippetThumbnails;
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
  thumbnails: YoutubeSnippetThumbnails;
  channelTitle: string;
  localized: {
    title: string;
    description: string;
  };
}

export interface YoutubePlaylistItem extends HasSnippetThumbnail {
  id: string;
  status?: YoutubePlaylistItemStatus;
  snippet?: YoutubePlaylistItemSnippet;
}

export interface YoutubeSnippetThumbnails {
  default: YoutubeThumbnails;
  medium: YoutubeThumbnails;
  high: YoutubeThumbnails;
  standard?: YoutubeThumbnails;
  maxres?: YoutubeThumbnails;
}

export interface HasSnippetThumbnail {
  snippet?: {
    thumbnails: YoutubeSnippetThumbnails;
  };
}

export interface YoutubePagination<T> {
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: T[];
}

export interface YoutubeVideo {
  id: string;
  contentDetails: {
    duration: string;
  };
}
