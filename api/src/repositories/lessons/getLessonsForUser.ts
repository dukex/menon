import { IDatabase, Lesson } from "../../types";

export async function getLessonsForUser(
  courseId: string,
  userId: string,
  database: IDatabase
) {
  const stmt = database
    .prepare(
      "SELECT l.*, COALESCE(ls.time, 0) as time, COALESCE(ls.finished, 0) as finished " +
        "FROM courses_lessons cl " +
        "LEFT JOIN lessons l ON l.id = cl.lesson_id " +
        "LEFT JOIN lesson_statues ls ON ls.lesson_id = l.id AND ls.user_id=?2  " +
        "WHERE cl.course_id=?1 " +
        "ORDER BY l.position ASC"
    )
    .bind(courseId, userId);

  return (await stmt.all<Lesson>()).results || [];
}
