import slugify from "./helpers/slugify";

export interface CourseImported {
  id: string;
  slug: string;
  status: "pending" | "error" | "imported";
  provider_id: string;
}

export interface Course extends CourseImported {
  provider_uid: string;
  name: string;
  description: string;
  creator_name: string;
  thumbnail_url: string;
  published_at: string;
  source_url: string;
  lessons: Lesson[]
}

export interface CourseImportRequest {
  provider: string;
  source: string;
}

export async function getCourse(
  slug: string,
  database: D1Database
): Promise<Course> {
  const stmt = database
    .prepare("SELECT * FROM courses WHERE slug=? LIMIT 1")
    .bind(slug);
  return await stmt.first<Course>();
}

export async function importCourse(
  body: CourseImportRequest,
  apiKey: string,
  database: D1Database
): Promise<CourseImported> {
  const id = body.source.split("list=")[1];

  const stmt = database
    .prepare(
      "SELECT id, provider_id, slug, status FROM courses WHERE provider_id=?1 AND provider_uid=?2"
    )
    .bind(id, body.provider);

  const alreadyExistentCourse = await stmt.first<CourseImported | null>();

  if (alreadyExistentCourse) {
    if (alreadyExistentCourse.status == "pending") {
      await importLessons(
        { id, courseId: alreadyExistentCourse.id },
        apiKey,
        database
      );
    }

    return alreadyExistentCourse;
  }

  const url = `https://www.googleapis.com/youtube/v3/playlists?id=${id}&key=${apiKey}&part=snippet,id,status`;

  const youtubeResponse = await fetch(url).then((r) =>
    r.json<YoutubePlaylistList>()
  );

  console.log(youtubeResponse);

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

  await importLessons({ id: id, courseId: course.id }, apiKey, database);

  return {
    id: course.id,
    slug: course.slug,
    provider_id: id,
    status: "pending",
  };
}

async function listAll<T>(
  url: string,
  params: Record<string, any>,
  nextPageToken?: string | null
): Promise<T[]> {
  const fullUrl = [
    url,
    [
      ...Object.keys(params).map((k) => `${k}=${params[k]}`),
      ...[`pageToken=${nextPageToken || ""}`, "maxResults=50"],
    ].join("&"),
  ].join("?");

  const youtubeResponse = await fetch(fullUrl).then((r) =>
    r.json<YoutubePagination<T>>()
  );

  if (youtubeResponse.nextPageToken) {
    const nextItems = await listAll<T>(
      url,
      params,
      youtubeResponse.nextPageToken
    );

    return [...youtubeResponse.items, ...nextItems];
  }

  return youtubeResponse.items;
}

async function importLessons(
  { id, courseId }: { id: string; courseId: string },
  apiKey: string,
  database: D1Database
) {
  const items = await listAll<YoutubePlaylistItemItem>(
    "https://www.googleapis.com/youtube/v3/playlistItems",
    {
      playlistId: id,
      key: apiKey,
      part: "contentDetails,snippet,id,status",
    }
  );

  const stmt = database.prepare(
    "" +
      "INSERT INTO lessons (" +
      " slug," +
      " name," +
      " duration," +
      " position," +
      " provider_uid," +
      " provider_id," +
      " thumbnail_url," +
      " description," +
      " course_id," +
      " id," +
      " published_at," +
      " source_url" +
      ") VALUES(?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12) ON CONFLICT (course_id, slug) DO NOTHING"
  );


  const operations = items.map((item) => 
    stmt.bind(
      slugify(item.snippet.title),
      item.snippet.title,
      0,
      item.snippet.position,
      "youtube",
      item.id,
      thumbnailUrl(item),
      item.snippet.description,
      courseId,
      crypto.randomUUID(),
      item.contentDetails.videoPublishedAt,
      ""
    ),
  );

  await database.batch(operations)

  await database
  .prepare(
    "UPDATE courses SET status='imported' WHERE id=?1"
  )
  .bind(courseId)
  .run();

  return true
}

const thumbnailUrl = (item) =>
  [
    item.snippet.thumbnails.maxres,
    item.snippet.thumbnails.standard,
    item.snippet.thumbnails.high,
    item.snippet.thumbnails.medium,
    item.snippet.thumbnails.default,
  ].find((thumb) => thumb && thumb.url && thumb.url.length > 0).url;



export async function getLessons(
  courseId: string,
  database: D1Database
): Promise<Lesson[]> {
  const stmt = database
    .prepare("SELECT * FROM lessons WHERE course_id=?")
    .bind(courseId);

  return (await stmt.all<Lesson>()).results;
}

interface Lesson {
  slug: string,
  name: string,
  duration: number,
  position: number,
  provider_uid: 'youtube',
  provider_id: string,
  thumbnail_url: string,
  description: string,
  course_id: string,
  id: string,
  published_at: string,
  source_url: string
}