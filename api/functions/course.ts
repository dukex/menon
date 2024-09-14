import { Course, Lesson } from "./types";

export async function getCourse(
  slug: string,
  database: D1Database
): Promise<Course> {
  const stmt = database
    .prepare("SELECT * FROM courses WHERE (slug=? OR id=?) LIMIT 1")
    .bind(slug, slug);
  return await stmt.first<Course>();
}

export async function getLessonsForMe(
  courseId: string,
  userId: string,
  database: D1Database
) {
  const stmt = database
    .prepare(
      "SELECT l.*, COALESCE(ls.time, 0) as time, COALESCE(ls.finished, 0) as finished " +
        "FROM courses_lessons cl " +
        "LEFT JOIN lessons l ON l.id = cl.lesson_id " +
        "LEFT JOIN lesson_statues ls ON ls.lesson_id = l.id AND ls.user_id=?2  " +
        "WHERE cl.course_id=?1" +
        "ORDER BY l.position ASC"
    )
    .bind(courseId, userId);

  return (await stmt.all<Lesson>()).results;
}

export async function searchCourses(
  params: URLSearchParams,
  database: D1Database
) {
  const bindings = [];
  let queries = "WHERE 1=1";

  params.forEach((value, key) => {
    bindings.push(value);

    queries = queries + ` AND ${key}=?`;
  });

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
    .prepare(
      "SELECT l.*" +
        "FROM courses_lessons cl " +
        "LEFT JOIN lessons l ON l.id = cl.lesson_id " +
        "WHERE cl.course_id=?1" +
        "ORDER BY l.position ASC"
    )
    .bind(courseId);

  return (await stmt.all<Lesson>()).results;
}

export async function updateProgress(
  userId: string,
  lessonId: string,
  progress: number,
  finished: boolean,
  database: D1Database
) {
  const stmt = database
    .prepare(
      "INSERT INTO lesson_statues (id, lesson_id, user_id, time, finished, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7) ON CONFLICT (lesson_id, user_id) DO UPDATE SET time=?4, finished=?5, updated_at=?7"
    )
    .bind(
      crypto.randomUUID(),
      lessonId,
      userId,
      progress,
      finished,
      Date.now(),
      Date.now()
    );

  return stmt.run();
}
