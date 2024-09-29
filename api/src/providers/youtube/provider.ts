import IProvider from "../IProvider";

import slugify from "../../helpers/slugify";
import { saveCourse } from "../../repositories/courses/saveCourse";
import { updateCourse } from "../../repositories/courses/updateCourse";
import { saveBatchLessons } from "../../repositories/lessons";
import {
  getPlaylist,
  getPlaylistItems,
  HasSnippetThumbnail,
} from "../../repositories/youtube";
import { IDatabase, CourseImported, InvalidProviderError } from "../../types";

export default class YoutubeProvider implements IProvider {
  key: string;
  source: string;

  constructor(key: string, source: string) {
    this.key = key;
    this.source = source;
  }

  get id(): string {
    try {
      const url = new URL(this.source);
      return url.searchParams.get("list")!;
    } catch (error) {
      throw new InvalidProviderError();
    }
  }

  async importCourse(database: IDatabase): Promise<CourseImported> {
    const playlist = await getPlaylist(this.id, this.key);

    const course = {
      id: crypto.randomUUID(),
      provider_uid: "youtube-playlist",
      provider_id: this.id!,
      slug: slugify(playlist.snippet!.title),
      name: playlist.snippet!.title,
      description: playlist.snippet!.description,
      creator_name: playlist.snippet!.channelTitle,
      thumbnail_url: thumbnailUrl(playlist),
      published_at: playlist.snippet!.publishedAt,
      source_url: this.source,
    };

    await saveCourse(course, database);

    return { ...course, status: "pending" };
  }

  async importLessons(courseId: string, database: IDatabase): Promise<boolean> {
    const items = await getPlaylistItems(this.id, this.key);

    await saveBatchLessons(
      courseId,
      items.map((item) => {
        return {
          title: item.snippet.title,
          duration: item.duration,
          position: item.snippet.position,
          provider: "youtube",
          providerId: item.contentDetails.videoId,
          thumbnailUrl: thumbnailUrl(item),
          description: item.snippet.description,
          publishedAt: item.contentDetails.videoPublishedAt,
          metadata: JSON.stringify({ id: item.id }),
        };
      }),
      database
    );

    await updateCourse(courseId, { status: "imported" }, database);

    return true;
  }
}

function thumbnailUrl(item: HasSnippetThumbnail) {
  const thumbnail = item.snippet?.thumbnails;

  const thumbnails = [
    thumbnail?.maxres,
    thumbnail?.standard,
    thumbnail?.high,
    thumbnail?.medium,
    thumbnail?.default,
  ];

  return (
    thumbnails.find((thumb) => thumb && thumb.url && thumb.url.length > 0)
      ?.url || null
  );
}
