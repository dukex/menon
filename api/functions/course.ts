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

export async function getCoursesForMe(userId: string, database: D1Database) {
  const stmt = database
    .prepare(
      "SELECT DISTINCT c.*, ROUND( SUM(ls.finished + 0.0 )/ COUNT(cl.id), 2) as progress " +
        "FROM courses c " +
        "JOIN courses_lessons cl ON c.id = cl.course_id " +
        "LEFT JOIN lesson_statues ls ON cl.lesson_id = ls.lesson_id AND ls.user_id = ?1"
    )
    .bind(userId);
  return (await stmt.all<Course>()).results;
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
  database: D1Database
) {
  const finished = progress >= 100;

  const stmt = database
    .prepare(
      "INSERT INTO lesson_statues (id, lesson_id, user_id, time, finished, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, (SELECT COALESCE(ls.time, 0)/lessons.duration > 0.85 FROM lessons LEFT JOIN lesson_statues ls ON ls.lesson_id = lessons.id AND ls.user_id = ?3 WHERE lessons.id = ?2), ?5, ?6) ON CONFLICT (lesson_id, user_id) DO UPDATE SET time=?4, finished=EXCLUDED.finished, updated_at=?6"
    )
    .bind(
      crypto.randomUUID(),
      lessonId,
      userId,
      progress,
      Date.now(),
      Date.now()
    );

  return stmt.run();
}
