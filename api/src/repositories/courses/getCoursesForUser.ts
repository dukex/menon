import { Course, IDatabase } from "../../types";

export async function getCoursesForUser(userId: string, database: IDatabase) {
  const stmt = database
    .prepare(
      "SELECT DISTINCT c.*, ROUND(SUM(ls.finished + 0.0)/COUNT(cl.id), 2) as progress " +
        "FROM courses c " +
        "JOIN courses_lessons cl ON c.id = cl.course_id " +
        "LEFT JOIN lesson_statues ls ON cl.lesson_id = ls.lesson_id AND ls.user_id = ?1"
    )
    .bind(userId);

  console.log(stmt);

  return (await stmt.all<Course>()).results;
}
