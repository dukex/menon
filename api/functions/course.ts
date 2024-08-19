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
  lessons: Lesson[];
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
    .prepare("SELECT * FROM courses WHERE (slug=? OR id=?) LIMIT 1")
    .bind(slug, slug);
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

  const playlistItem = youtubeResponse.items[0];

  const course = {
    id: crypto.randomUUID(),
    provider_uid: "youtube-playlist",
    provider_id: id,
    slug: slugify(playlistItem.snippet.title),
    name: playlistItem.snippet.title,
    description: playlistItem.snippet.description,
    creator_name: playlistItem.snippet.channelTitle,
    thumbnail_url: thumbnailUrl(playlistItem),
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
  const items = (
    await listAll<YoutubePlaylistItemItem>(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        playlistId: id,
        key: apiKey,
        part: "contentDetails,snippet,id,status",
      }
    )
  ).filter((i) => i.status.privacyStatus !== "private");

  const insertStmt = database.prepare(
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
      " id," +
      " published_at," +
      " source_url" +
      ") VALUES(?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11) ON CONFLICT (provider_id, provider_uid) DO NOTHING RETURNING id"
  );

  const selectStmt = database.prepare(
    "SELECT id FROM lessons WHERE provider_id = ?"
  );

  const operations = items.flatMap((item) => [
    insertStmt.bind(
      slugify(item.snippet.title),
      item.snippet.title,
      0,
      item.snippet.position,
      "youtube",
      item.id,
      thumbnailUrl(item),
      item.snippet.description,
      crypto.randomUUID(),
      item.contentDetails.videoPublishedAt,
      ""
    ),
    selectStmt.bind(item.id),
  ]);

  const lessonsInsertResults = await database.batch<{ id: string }>(operations);

  const courseLessonsStmt = database.prepare(
    "INSERT INTO courses_lessons(id, course_id, lesson_id) VALUES (?1,?2,?3) ON CONFLICT (course_id, lesson_id) DO NOTHING"
  );

  await database.batch(
    lessonsInsertResults
      .flatMap((o) => o.results)
      .map((l) => courseLessonsStmt.bind(crypto.randomUUID(), courseId, l.id))
  );

  await database
    .prepare("UPDATE courses SET status='imported',updated_at=?1 WHERE id=?2")
    .bind(new Date().toISOString(), courseId)
    .run();

  return true;
}

const thumbnailUrl = (item) =>
  [
    item.snippet.thumbnails.maxres,
    item.snippet.thumbnails.standard,
    item.snippet.thumbnails.high,
    item.snippet.thumbnails.medium,
    item.snippet.thumbnails.default,
  ].find((thumb) => thumb && thumb.url && thumb.url.length > 0).url;

export async function searchCourses(
  params: URLSearchParams,
  database: D1Database
) {
  const bindings = [];
  let queries = "WHERE 1=1";

  params.forEach((value, key) => {
    console.log(value, key);
    bindings.push(value);

    queries = queries + ` AND ${key}=?`;
  });

  console.log(`SELECT * FROM courses ${queries}`, bindings);

  const stmt = database
    .prepare(`SELECT * FROM courses ${queries}`)
    .bind(...bindings);

  return (await stmt.all<Course>()).results;
}

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
  slug: string;
  name: string;
  duration: number;
  position: number;
  provider_uid: "youtube";
  provider_id: string;
  thumbnail_url: string;
  description: string;
  id: string;
  published_at: string;
  source_url: string;
}
