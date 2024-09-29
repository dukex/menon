import slugify from "../helpers/slugify";
import { Lesson, IDatabase } from "../types";

export async function getLessonsByCourseId(
  courseId: string,
  database: IDatabase
): Promise<Lesson[]> {
  const stmt = database
    .prepare(
      "SELECT l.* " +
        "FROM courses_lessons cl " +
        "LEFT JOIN lessons l ON l.id = cl.lesson_id " +
        "WHERE cl.course_id=?1" +
        "ORDER BY l.position ASC"
    )
    .bind(courseId);

  return (await stmt.all<Lesson>()).results || [];
}

export async function saveBatchLessons(
  courseId: string,
  lessons: {
    title: string;
    duration: number | undefined;
    position: number;
    provider: string;
    providerId: string;
    thumbnailUrl: string | null;
    description: string;
    publishedAt: string;
    metadata: string;
  }[],
  database: IDatabase
) {
  const insertStmt = database.prepare(
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
      " source_url," +
      " metadata" +
      ") VALUES(?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12) ON CONFLICT (provider_id, provider_uid) DO NOTHING RETURNING id"
  );

  const selectStmt = database.prepare(
    "SELECT id FROM lessons WHERE provider_id = ?"
  );

  const operations = lessons.flatMap((lesson) => [
    insertStmt.bind(
      slugify(lesson.title),
      lesson.title,
      lesson.duration,
      lesson.position,
      lesson.provider,
      lesson.providerId,
      lesson.thumbnailUrl,
      lesson.description,
      crypto.randomUUID(),
      lesson.publishedAt,
      "",
      lesson.metadata
    ),
    selectStmt.bind(lesson.providerId),
  ]);

  const lessonsInsertResults = await database.batch<{ id: string }>(operations);

  const courseLessonsStmt = database.prepare(
    "INSERT INTO courses_lessons(id, course_id, lesson_id) VALUES (?1,?2,?3) ON CONFLICT (course_id, lesson_id) DO NOTHING"
  );

  await database.batch(
    lessonsInsertResults
      .flatMap((o) => o.results!)
      .map((l) => courseLessonsStmt.bind(crypto.randomUUID(), courseId, l.id))
  );

  return true;
}
